import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash, FaCloudUploadAlt, FaArrowLeft, FaSpinner, FaSignOutAlt, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminGallery = () => {

    const [photos, setPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedIds, setSeletedIds] = useState([]);
    //const [isSelectMode, setIsSelectMode] = useState(false);

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Wedding');

    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const fetchPhotos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/gallery');
            setPhoto(res.data);
        } catch (error) {
            toast.error("Failed to load photos");
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success("Logged out");
        navigate('/admin');
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            return toast.error("Please select a file first!");
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);

        try {
            await axios.post('http://localhost:5000/api/gallery/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success("Photo Uploaded!");
            setFile(null);
            setTitle('');
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            fetchPhotos();

        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this photo?")) {
            return;
        }

        setDeletingId(id);

        try {
            await axios.delete(`http://localhost:5000/api/gallery/${id}`);
            toast.success("Photo deleted");
            fetchPhotos();
        } catch (error) {
            toast.error("Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    const toggleSelection = (id) => {
        if (selectedIds.includes(id)) {
            setSeletedIds(selectedIds.filter(itemId => itemId !== id));
        } else {
            setSeletedIds([...selectedIds, id]);
        }
    }

    const handleBUlkDelete = async () => {
        if (!window.confirm(`Delete ${selectedIds.length} photos`)) {
            return;
        }

        setLoading(true);
        try {
            await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:5000/api/gallery/${id}`)));

            toast.success("Photos deleted successfully");
            setSeletedIds([]);
            fetchPhotos();
        } catch (error) {
            toast.error("Some deletes failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-dark text-white p-4 md:p-8'>
            <div className='container mx-auto max-w-[1400px]'>

                <div className='relative flex items-center justify-between mb-8 pb-4 border-b border-white/10'>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className='text-gold hover:text-white transition flex items-center gap-2 text-sm md:text-base'
                    >
                        <FaArrowLeft /> <span className='hidden md:inline'>Back</span>
                    </button>

                    <h1 className='absolute left-1/2 -translate-x-1/2 text-xl md:text-3xl font-serif text-center'>Gallery Manager</h1>

                    <button
                        onClick={handleLogout}
                        className='text-red-500 hover:text-red-400 transition flex items-center gap-2 text-sm md:text-base font-bold'
                    >
                        <span className='hidden md:inline'>LOGOUT</span> <FaSignOutAlt />
                    </button>
                </div>

                <div className='bg-white/5 p-6 rounded-xl border border-white/10 w-full shadow-lg mb-10'>
                    <h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                        <FaCloudUploadAlt className='text-gold text-xl' /> Upload New Photo
                    </h2>

                    <form
                        onSubmit={handleUpload}
                        className='space-y-4'
                    >
                        <div>
                            <input
                                type="text"
                                placeholder='Photo Title (e.g. Haldi Ceremony)'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='w-full bg-black/50 border border-gray-700 p-4 rounded-lg text-white outline-none focus:border-gold placeholder-gray-500 transition'
                                required
                            />
                        </div>

                        <div className='flex flex-col md:flex-row gap-4'>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full md:w-1/4 bg-black/50 border border-gray-700 p-4 rounded-lg text-white outline-none focus:border-gold cursor-pointer'
                            >
                                <option>Wedding</option>
                                <option>Pre-Wedding</option>
                                <option>Engagement</option>
                                <option>Commercial</option>
                            </select>

                            <div className='w-full md:w-3/4 relative'>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept='image/*'
                                    className='w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-gray-400 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-yellow-500 cursor-pointer'
                                />
                            </div>
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className={`w-full py-4 rounded-lg font-bold text-lg tracking-wide transition flex justify-center items-center gap-2 ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gold text-black hover:bg-yellow-500 shadow-md hover:shadow-gold/20'}`}
                        >
                            {loading && <FaSpinner className='animate-spin' />}
                            {loading ? "UPLOADING..." : "UPLOAD PHOTO"}
                        </button>
                    </form>
                </div>


                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-semibold text-white/90'>Your Gallery ({photos.length})</h2>
                    {selectedIds.length > 0 && (
                        <span className='text-gold text-sm animate-pulse font-mono'>
                            {selectedIds.length} Selected
                        </span>
                    )}
                </div>

                {photos.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 text-gray-500 border-2 border-dashed border-gray-800 rounded-xl bg-white/5'>
                        <FaCloudUploadAlt className='text-4xl mb-3 opacity-50' />
                        <p>No photos uploaded yet.</p>
                    </div>

                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {photos.map((photo) => {
                            const isSelected = selectedIds.includes(photo._id);

                            return (
                                <div
                                    key={photo._id}
                                    className={`group relative bg-black rounded-lg overflow-hidden border transition-all duration-300
                                        ${isSelected ? 'border-gold ring-2 ring-gold' : 'border-white/10 hover:border-white/30'}
                                    `}
                                >
                                    <div className='aspect-3/4 relative overflow-hidden'>
                                        <img
                                            src={photo.imageUrl}
                                            alt={photo.title}
                                            loading='lazy'
                                            className={`w-full h-full object-cover transition duration-300 transform group-hover:scale-105
                                                ${deletingId === photo._id ? 'opacity-20 grayscale' : 'opacity-90'}
                                            `}
                                        />

                                        <div className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/70 to-transparent p-4 pt-10'>
                                            <p className='text-sm font-bold text-white truncate'>{photo.title}</p>
                                            <p className='text-xs text-gold uppercase tracking-wider'>{photo.category}</p>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => toggleSelection(photo._id)}
                                        className='absolute top-3 left-3 z-10 cursor-pointer'
                                    >
                                        <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all shadow-md
                                            ${isSelected ? 'bg-gold border-gold text-black' : 'bg-black/50 border-white/50 hover:bg-black/70'}
                                        `}>
                                            {isSelected && <FaCheck size={12} />}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(photo._id)}
                                        className='hidden md:block absolute top-3 right-3 bg-red-600/90 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 transform hover:scale-110'
                                        title='Delete Photo'
                                    >
                                        <FaTrash size={12} />
                                    </button>

                                    {deletingId === photo._id && (
                                        <div className='absolute inset-0 flex items-center justify-center z-20'>
                                            <FaSpinner className='animate-spin text-gold text-3xl' />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {selectedIds.length > 0 && (
                <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-8 py-3 rounded-full shadow-2xl z-50 flex items-center gap-4 animate-bounce-in'>
                    <span className='font-bold'>{selectedIds.length} Photos Selected</span>
                    <div className='h-4 w-1px bg-white/30'></div>
                    <button
                        onClick={handleBUlkDelete}
                        className='font-bold hover:underline flex items-center gap-2'
                    >
                        {loading ? <FaSpinner className='animate-spin'/> : <FaTrash />}
                        DELETE
                    </button>
                    <button
                        onClick={() => setSeletedIds([])}
                        className='ml-2 text-sm backdrop-opacity-80 hover:opacity-100'
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div >
    );
};

export default AdminGallery