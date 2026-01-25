import React from 'react'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div id='home' className='w-full h-screen relative'>
      <img 
        src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
        alt="Wedding Photography"
        className='w-full h-full object-cover' 
      />

      <div className='absolute inset-0 bg-black/50'></div>

      <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4'>
        <p className='text-gold text-sm md:text-lg uppercase tracking-[0.2em] mb-4 animate-fadeIn'>
          Capturing Emotions, Creating Memories
        </p>

        <h1 className='text-5xl md:text-8xl lg:text-8xl font-serif font-bold mb-6'>
          SAPNA <span className='text-transparent bg-clip-text bg-linear-to-r from-gold to bg-yellow-200'>STUDIO</span>
        </h1>

        <p className='max-w-2xl text-gray-200 text-sm md:text-lg mb-8 leading-relaxed'>
          Professional Wedding, Pre-Wedding & Commercial Photography based in Bihar.
          We turn your special moment into timeless art.
        </p>

        <div className='flex gap-4'>
          <Link 
            to='gallery'
            smooth={true}
            duration={500}
            offset={-80}
            className='border-2 border-gold text-gold px-8 py-3 rounded-full font-bold hover:bg-gold hover:text-black transition cursor-pointer'
          >
            VIEW GALLERY
          </Link>
          
          <Link 
            to='contact'
            smooth={true}
            duration={500}
            offset={-80}
            className='bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-white transition cursor-pointer'
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero