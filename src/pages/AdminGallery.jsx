import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash, FaCloudUploadAlt, FaArrowLeft, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminGallery = () => {

    const [photos, setPhoto] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [selectedIds, setSeletedIds] = useState([]);
    const [isSelectMode, setIsSelectMode] = useState(false);

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
            setIsSelectMode(false);
            fetchPhotos();
        } catch (error) {
            toast.error("Some deletes failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-dark text-white p-4 md:p-8'>
            <div className='max-w-6xl mx-auto'>

                <div className='flex flex-cols md:flex-row justify-between items-center gap-4 mb-8'>
                    <div className='flex items-center gap-4 w-full md:w-auto'>
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className='text-gold hover:underline flex items-center gap-2 text-sm md:text-base'
                        >
                            <FaArrowLeft /> Back to Dashboard
                        </button>
                        <h1 className='text-xl md:text-2xl font-serif'>Gallery Manager</h1>
                    </div>

                    {photos.length > 0 && (
                        <button
                            onClick={() => {
                                setIsSelectMode(!isSelectMode);
                                setSeletedIds([]);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-bold border transition
                                ${isSelectMode ? 'bg-gold text-black border-gold' : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'}`}
                        >
                            {isSelectMode ? "Cancel Selection" : "Select Multiple"}
                        </button>
                    )}
                </div>

                {!isSelectMode && (
                    <div className='bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 max-w-2xl mb-10'>
                        <h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                            <FaCloudUploadAlt className='text-gold' /> Upload New Photo
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
                                    className='w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-gold placeholder-gray-500'
                                    required
                                />
                            </div>

                            <div className='flex flex-col md:flex-row gap-4'>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className='w-full md:w-1/3 bg-black/50 border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-gold'
                                >
                                    <option>Wedding</option>
                                    <option>Pre-Wedding</option>
                                    <option>Engagement</option>
                                    <option>Commercial</option>
                                </select>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept='image/*'
                                    className='w-full md:w-2/3 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-yellow-500 cursor-pointer'
                                />
                            </div>

                            <button
                                type='submit'
                                disabled={loading}
                                className={`w-full py-3 rounded-lg font-bold transition flex justify-center items-center gap-2 ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-gold text-black hover:bg-yellow-500'}`}
                            >
                                {loading && <FaSpinner className='animate-spin' />}
                                {loading ? "UPLOADING..." : "UPLOAD PHOTO"}
                            </button>
                        </form>
                    </div>
                )}

                <div className='flex justify-between items-center mb-4'> </div>
                
                <h2 className='text-xl font-semibold mb-4'>Your Gallery ({photos.length})</h2>

                {photos.length === 0 ? (
                    <p className='text-gray-500 italic'>No photos uploaded yet.</p>
                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6'>
                        {photos.map((photo) => (
                            <div
                                key={photo._id}
                                className='group relative bg-black rounded-lg overflow-hidden border border-white/10 aspect-3/4 md:aspect-square'
                            >
                                <img
                                    src={photo.imageUrl}
                                    alt={photo.title}
                                    className={`w-full h-full object-cover transition duration-300
                                    ${deletingId === photo._id ? 'opacity-20' : 'opacity-80 group-hover:opacity-100'}`}
                                />

                                <div className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/70 to-transparent p-3 pt-8'>
                                    <p className='text-sm font-bold text-white truncate'>{photo.title}</p>
                                    <p className='text-xs text-gold'>{photo.category}</p>
                                </div>

                                {deletingId === photo._id ? (
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <FaSpinner className='animate-spin text-gold text-2xl' />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleDelete(photo._id)}
                                        className='absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition opacity-100 md:opacity-0 md:group-hover:opacity-100'
                                        title='Delete Photo'
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default AdminGallery