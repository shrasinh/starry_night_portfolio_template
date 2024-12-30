'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation ( { activeSection } )
{
  const [ isOpen, setIsOpen ] = useState( false );
  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const offCanvasRef = useRef( null );

  const handleClick = ( sectionId ) =>
  {
    const sectionElement = document.getElementById( sectionId );
    if ( sectionElement )
    {
      const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY - document.querySelector( 'nav' ).getBoundingClientRect().height;
      window.scrollTo( { top: sectionTop, behavior: 'auto' } );
    }
  };

  useEffect( () =>
  {
    const handleModalOpen = () => setIsModalOpen( true );
    const handleModalClose = () => setIsModalOpen( false );
    window.addEventListener( 'modalOpen', handleModalOpen );
    window.addEventListener( 'modalClose', handleModalClose );
    return () =>
    {
      window.removeEventListener( 'modalOpen', handleModalOpen );
      window.removeEventListener( 'modalClose', handleModalClose );
    };
  }, [] );

  const handleDelayedClose = ( sectionId ) =>
  {
    handleClick( sectionId );
    setTimeout( () =>
    {
      setIsOpen( false );
    }, 500 );
  };

  const navItems = [
    { id: 'about-me', label: 'About Me' },
    { id: 'skills', label: 'Skills' },
    { id: 'resume', label: 'Resume', href: '/Resume.pdf' }
  ];

  return (
    <motion.nav
      initial={ { y: -100 } }
      animate={ { y: 0 } }
      transition={ { type: 'spring', stiffness: 100 } }
      className={ `md:fixed sticky top-0 w-full z-40 transition-opacity duration-300 ${ isModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100' }` }
    >
      <div className="bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={ { scale: 1.05 } }
              whileTap={ { scale: 0.95 } }
              className="flex-shrink-0"
            >
              <button
                onClick={ () => handleClick( 'about-me' ) }
                className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text hover:from-purple-400 hover:to-pink-600 transition-all duration-300"
                aria-label="Navigate to About Me section"
              >
                Your Name
              </button>
            </motion.div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              { navItems.map( ( item ) => (
                item.href ? (
                  <motion.a
                    key={ item.id }
                    href={ item.href }
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={ { scale: 1.05 } }
                    whileTap={ { scale: 0.95 } }
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white  hover:bg-gray-800 transition-colors duration-300 glow-button"
                  >
                    { item.label }
                  </motion.a>
                ) : (
                  <motion.button
                    key={ item.id }
                    onClick={ () => handleClick( item.id ) }
                    whileHover={ { scale: 1.05 } }
                    whileTap={ { scale: 0.95 } }
                    className={ `px-4 py-2 rounded-lg transition-all duration-300 ${ activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800 glow-button'
                      }` }
                  >
                    { item.label }
                  </motion.button>
                )
              ) ) }
            </div>

            <motion.button
              whileHover={ { scale: 1.1 } }
              whileTap={ { scale: 0.9 } }
              onClick={ () => setIsOpen( !isOpen ) }
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
              aria-label={ isOpen ? 'Close menu' : 'Open menu' }
            >
              { isOpen ? '✕' : '☰' }
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        { isOpen && (
          <motion.div
            ref={ offCanvasRef }
            initial={ { x: '100%' } }
            animate={ { x: 0 } }
            exit={ { x: '100%' } }
            transition={ { type: 'spring', damping: 20 } }
            className="fixed top-0 right-0 h-full w-full md:w-80 bg-gray-900/95 backdrop-blur-lg shadow-xl"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-end">
                <motion.button
                  whileHover={ { scale: 1.1 } }
                  whileTap={ { scale: 0.9 } }
                  onClick={ () => setIsOpen( false ) }
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  ✕
                </motion.button>
              </div>

              <motion.div
                initial={ { opacity: 0, y: 20 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { delay: 0.2 } }
                className="flex-grow flex flex-col justify-center space-y-6"
              >
                { navItems.map( ( item, index ) => (
                  <motion.div
                    key={ item.id }
                    initial={ { opacity: 0, x: -20 } }
                    animate={ { opacity: 1, x: 0 } }
                    transition={ { delay: index * 0.1 } }
                  >
                    { item.href ? (
                      <a
                        href={ item.href }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-lg text-center py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300 glow-button"
                      >
                        { item.label }
                      </a>
                    ) : (
                      <button
                        onClick={ () => handleDelayedClose( item.id ) }
                        className={ `w-full text-lg py-3 px-4 rounded-lg transition-all duration-300 ${ activeSection === item.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800 glow-button'
                          }` }
                      >
                        { item.label }
                      </button>
                    ) }
                    <hr className="w-full mt-6 border-t-2 border-purple-500 animate-pulse" />
                  </motion.div>
                ) ) }
              </motion.div>
            </div>
          </motion.div>
        ) }
      </AnimatePresence>
    </motion.nav>
  );
}