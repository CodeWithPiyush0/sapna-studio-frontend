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
        <p className='text-gold text-xs md:text-lg uppercase tracking-[0.2em] mb-4 animate-fadeIn'>
          Capturing Emotions, Creating Memories
        </p>

        <h1 className='text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6'>
          SAPNA <span className='text-transparent bg-clip-text bg-linear-to-r from-gold to bg-yellow-200'>STUDIO</span>
        </h1>

        <p className='max-w-2xl text-gray-200 text-sm md:text-lg mb-8 leading-relaxed px-2'>
          Professional Wedding, Pre-Wedding & Commercial Photography based in Bihar.
          We turn your special moment into timeless art.
        </p>

        <div className='flex flex-col justify-center md:flex-row gap-4 w-full md:w-full px-8 md:px-0'>
          <Link 
            to='gallery'
            smooth={true}
            duration={500}
            offset={-80}
            className='border-2 border-gold text-gold px-8 py-3 rounded-full font-bold hover:bg-gold hover:text-black transition cursor-pointer w-full md:w-auto text-center'
          >
            VIEW GALLERY
          </Link>
          
          <Link 
            to='contact'
            smooth={true}
            duration={500}
            offset={-80}
            className='bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-white transition cursor-pointer w-full md:w-auto text-center'
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero