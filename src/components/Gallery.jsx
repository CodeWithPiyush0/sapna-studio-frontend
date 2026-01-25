import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

const Gallery = () => {
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Wedding', 'Pre-Wedding', 'Engagement', 'Commercial'];

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/gallery');
                setPhotos(res.data);
                setFilteredPhotos(res.data);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            } finally{
                setLoading(false);
            }
        };
        fetchPhotos();
    }, []);

    useEffect(() => {
        if(activeCategory === 'All'){
            setFilteredPhotos(photos);
        } else {
            setFilteredPhotos(photos.filter(photo => photo.category === activeCategory))
        }
    }, [activeCategory, photos]);

  return (
    <div id='gallery' className='bg-black text-white py-20 px-4 md:px-8'>
        <div className='max-w-[1400px] mx-auto'>

            <div className='text-center mb-12'>
                <h2 className='text-gold text-lg uppercase tracking-widest mb-2'>Portfolio</h2>
                <h1 className='text-4xl md:text-5xl font-serif'>Captured Moments</h1>
                <div className='w-24 h-1 bg-gold mx-auto mt-6'></div>
            </div>

            <div className='flex overflow-x-auto md:justify-center gap-4 mb-10 pb-4 no-scrollbar'>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full border transition whitespace-nowrap
                            ${activeCategory === cat
                                ? 'bg-gold text-black border-gold font-bold'
                                : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className='flex justify-center py-20'>
                    <FaSpinner className='animate-spin text-gold text-4xl'/>
                </div>
            ) : (
                <>
                    {filteredPhotos.length === 0 ? (
                        <p className='text-center text-gray-500 py-10'>No Photos found in this category.</p>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {filteredPhotos.map((photo) => (
                                <div key={photo._id} className='group relative aspect-3/4 overflow-hidden rounded-lg cursor-pointer'>
                                    <img 
                                        src={photo.imageUrl} 
                                        alt={photo.title} 
                                        loading='lazy'
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:opacity-80"
                                    />

                                    <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6'>
                                        <p className='text-gold text-sm tracking-wider uppercase'>{photo.category}</p>
                                        <h3 className='text-xl font-serif'>{photo.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default Gallery