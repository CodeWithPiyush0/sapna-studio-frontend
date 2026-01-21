import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash, FaCloudUploadAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminGallery = () => {

    const [photos, setPhoto] = useState([]);
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Wedding');

    const navigate = useNavigate();

    const fetchPhotos = async() => {
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
        if(!file){
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
            fetchPhotos();

        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async(id) => {
        if(!window.confirm("Are you sure you want to delete this photo?")){
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/gallery/${id}`);
            toast.success("Photo deleted");
            fetchPhotos();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

  return (
    <div className='min-h-screen bg-dark text-white p-4 md:p-8'>
        <div className='flex items-center gap-4 mb-8'>
            <button
                onClick={() => navigate('/admin/dashboard')}
                className='text-gold hover:underline flex items-center gap-2'
            >
                <FaArrowLeft /> Back to Dashboard
            </button>
            <h1 className='text-2xl font-serif'>Gallery Manager</h1>
        </div>

        <div className='bg-white/5 p-6 rounded-xl border border-white/10 max-w-2xl '>
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
                        className='w-full bg-black/50 border border-gray-700 p-3 rounded-lg text-white outline-none focus:border-gold'
                        required
                    />
                </div>

                <div className='flex gap-4'>
                    <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='bg-black/50 border border-gray-700 p-3 rounded-lg text-white outline focus:border-gold'
                    >
                        <option>Wedding</option>
                        <option>Pre-Wedding</option>
                        <option>Engagement</option>
                        <option>Commercial</option>
                    </select>

                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        accept='image/*'
                        className='file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold file:text-black hover:file:bg-yellow-500 text-gray-300'
                    />
                </div>

                <button
                    type='submit'
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold transition ${loading ? 'bg-gray-600' : 'bg-gold text-black hover:bg-yellow-500'}`}
                >
                    {loading ? "UPLOADING..." : "UPLOAD PHOTO"}
                </button>
            </form>
        </div>

        <h2 className='text-xl font-semibold mb-4'>Your Gallery ({photos.length})</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {photos.map((photo) => (
                <div 
                    key={photo._id}
                    className='group relative bg-black rounded-lg overflow-hidden border border-white/10'    
                >
                    <img 
                        src={photo.imageUrl}
                        alt={photo.title} 
                        className='w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition'
                    />

                    <div className='absoulute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-3'>
                        <p className='text-sm font-bold text-white truncate'>{photo.title}</p>
                        <p className='text-xs text-gold'>{photo.category}</p>
                    </div>

                    <button
                        onClick={() => handleDelete(photo._id)}
                        className='absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg'
                    >
                        <FaTrash size={12}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AdminGallery