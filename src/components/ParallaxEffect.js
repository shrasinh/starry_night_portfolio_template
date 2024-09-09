'use client';

import { useEffect } from 'react';

export default function ParallaxEffect ( { activeSection, setActiveSection } )
{
    useEffect( () =>
    {
        const handleScroll = () =>
        {
            const sections = document.querySelectorAll( '.parallax' );
            const viewportHeight = window.innerHeight;
            let newActiveSection = null;

            sections.forEach( ( section ) =>
            {
                const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                const sectionHeight = section.offsetHeight;

                const fadeInPoint = sectionTop - viewportHeight / 2
                const fadeOutPoint = sectionTop + sectionHeight - viewportHeight / 2

                // Check if the section is in the viewport
                if (
                    window.scrollY >= fadeInPoint &&
                    window.scrollY < fadeOutPoint
                )
                {
                    section.classList.add( 'visible' );
                    if ( !newActiveSection )
                    {
                        newActiveSection = section.id; // Mark the first fully visible section as the active section
                    }
                } else
                {
                    section.classList.remove( 'visible' ); // Hide sections not in the viewport
                }
            } );

            // Update the active section only if it has changed
            if ( newActiveSection && activeSection !== newActiveSection )
            {
                setActiveSection( newActiveSection );
            }
        };

        window.addEventListener( 'scroll', handleScroll );
        handleScroll(); // Initial call to set positions

        return () => window.removeEventListener( 'scroll', handleScroll );
    }, [ activeSection, setActiveSection ] );

    return null; // No UI needed for this component, just effects
}