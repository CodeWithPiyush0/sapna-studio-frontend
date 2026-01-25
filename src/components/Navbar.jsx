import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { FaBars, FaTimes, FaCamera } from 'react-icons/fa'

const Navbar = () => {

  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 50){
        setScrolled(true);
      } else {
        setScrolled(false)
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 1, link: 'home', text: 'Home' },
    { id: 2, link: 'gallery', text: 'Portfolio' },
    { id: 3, link: 'Contact', text: 'Contact' },
  ]

  return (
    <div className={`fixed w-full h-20 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 shadow-lg border-b border-gold/10' : 'bg-transparent'}`}>
      <div className='flex justify-between items-center w-full h-full px-4 md:px-8 max-w-[1400px] mx-auto text-white'>

        <div className='flex items-center gap-2 cursor-pointer'>
          <FaCamera className='text-gold text-2xl' />
          <h1 className='text-2xl md:text-3xl font-serif tracking-wider'>
            SAPNA <span className='text-gold'>STUDIO</span>
          </h1>
        </div>

        <ul className='hidden md:flex gap-8'>
          {links.map(({ id, link, text }) => (
            <li key={id} className='cursor-pointer font-medium hover:text-gold transition uppercase tracking-wide text-sm'>
              <Link to={link} smooth duration={500} offset={-80}>
                {text}
              </Link>
            </li>
          ))}
          <li className='cursor-pointer font-medium hover:text-gold transition uppercase tracking-wide text-sm opacity-50 hover:opacity-100'>
            <RouterLink to="/admin">Admin</RouterLink>
          </li>
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className='cursor-pointer pr-4 z-50 text-gold md:hidden'
        >
          {nav ? <FaTimes size={30}/> : <FaBars size={30} />}
        </div>

        {nav && (
          <div className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-black text-white transition-all duration-500 ease-in-out'>
            <ul className='flex flex-col gap-8 text-center'>
              {links.map(({ id, link, text }) => (
                <li key={id} className='text-3xl font-serif text-gray-300 hover:text-gold cursor-pointer'>
                  <Link 
                    onClick={() => setNav(false)}
                    to={link}
                    smooth
                    duration={500}
                  >
                    {text}
                  </Link>
                </li>
              ))}
              <li className='text-xl text-gray-500 hover:text-white mt-4'>
                <RouterLink onClick={() => setNav(false)} to="/admin">Admin Login</RouterLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar