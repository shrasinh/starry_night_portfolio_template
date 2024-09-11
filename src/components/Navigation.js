'use client';

import { useState, useRef, useEffect } from 'react';

export default function Navigation ( { activeSection } )
{
    const [ isOpen, setIsOpen ] = useState( false );
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

    const handleOutsideClick = ( event ) =>
    {
        if ( offCanvasRef.current && !offCanvasRef.current.contains( event.target ) )
        {
            setIsOpen( false );
        }
    };

    useEffect( () =>
    {
        if ( isOpen )
        {
            document.body.classList.add( 'overflow-hidden' );
            document.addEventListener( 'mousedown', handleOutsideClick );
            document.addEventListener( 'touchstart', handleOutsideClick );
        } else
        {
            document.body.classList.remove( 'overflow-hidden' );
            document.removeEventListener( 'mousedown', handleOutsideClick );
            document.removeEventListener( 'touchstart', handleOutsideClick );
        }

        return () =>
        {
            document.body.classList.remove( 'overflow-hidden' );
            document.removeEventListener( 'mousedown', handleOutsideClick );
            document.removeEventListener( 'touchstart', handleOutsideClick );
        };
    }, [ isOpen ] );

    const handleDelayedClose = ( sectionId ) =>
    {
        handleClick( sectionId );
        setTimeout( () =>
        {
            setIsOpen( false );
        }, 500 );
    };

    return (
        <nav
            className={ `
                fixed top-0 w-full bg-black bg-opacity-80 text-white pt-4 px-4 flex justify-between items-center z-50 shadow-lg backdrop-blur-md 
            small-h:sticky` }
        >
            <div
                className="text-2xl font-bold cursor-pointer focus:outline-none hover:animate-pulse"
                onClick={ () => handleClick( 'about-me' ) }
                role="button"
                aria-label="Navigate to About Me section"
            >
                [Your name]
            </div>
            <div className="space-x-4 hidden md:flex">
                <button
                    onClick={ () => handleClick( 'about-me' ) }
                    className={ `glow-button px-4 py-2 rounded-lg ${ activeSection === 'about-me' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-400' }` }
                    aria-label="Navigate to About Me section"
                >
                    About Me
                </button>
                <button
                    onClick={ () => handleClick( 'skills' ) }
                    className={ `glow-button px-4 py-2 rounded-lg ${ activeSection === 'skills' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'text-gray-400' }` }
                    aria-label="Navigate to Skills section"
                >
                    Skills
                </button>
                <a
                    href="https://example.com/your-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-button px-4 py-2 rounded-lg text-gray-400"
                    aria-label="View Resume"
                >
                    Resume
                </a>
            </div>
            <button
                onClick={ () => setIsOpen( !isOpen ) }
                className="md:hidden text-xl focus:outline-none"
                aria-label={ isOpen ? 'Close menu' : 'Open menu' }
            >
                { isOpen ? '' : '☰' }
            </button>
            <div
                ref={ offCanvasRef }
                className={ `fixed overflow-y-auto top-0 right-0 h-screen w-3/4 bg-gray-900 bg-opacity-80 text-white p-6 transition-transform transform ${ isOpen ? 'translate-x-0' : 'translate-x-full' } md:hidden` }
                style={ { display: 'flex', flexDirection: 'column' } }
            >
                <div className="text-end">
                    <button
                        onClick={ () => setIsOpen( false ) }
                        className="text-2xl focus:outline-none transition-transform transform hover:scale-110"
                        aria-label="Close menu"
                    >
                        ✖
                    </button>
                </div>

                {/* Make the content area scrollable with flex-grow */ }
                <div className="flex-grow flex flex-col justify-center items-center mt-4 space-y-8">
                    <button
                        onClick={ () => handleDelayedClose( 'about-me' ) }
                        className={ `block glow-button text-xl text-center py-3 px-4 w-full ${ activeSection === 'about-me' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl rounded-full' : 'text-gray-400' }` }
                        aria-label="Navigate to About Me section"
                    >
                        About Me
                    </button>
                    <hr className="w-3/4 border-t-2 border-purple-500 animate-pulse" />
                    <button
                        onClick={ () => handleDelayedClose( 'skills' ) }
                        className={ `block glow-button text-xl text-center py-3 px-4 w-full ${ activeSection === 'skills' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl rounded-full' : 'text-gray-400' }` }
                        aria-label="Navigate to Skills section"
                    >
                        Skills
                    </button>
                    <hr className="w-3/4 border-t-2 border-blue-500 animate-pulse" />
                    <a
                        href="https://example.com/your-resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block glow-button text-xl text-center py-3 px-4 w-full text-gray-400"
                        aria-label="View Resume"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
}
