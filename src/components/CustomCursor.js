'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor ()
{
    const canvasRef = useRef( null );
    const particlesRef = useRef( [] );
    const animationRef = useRef( null );
    const lastPosition = useRef( null );
    const isTouchDevice = useRef( false );

    useEffect( () =>
    {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext( '2d' );
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = particlesRef.current;

        const handleResize = () =>
        {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const updateCursor = ( e ) =>
        {
            const currentPosition = { x: e.clientX, y: e.clientY };

            if ( !lastPosition.current )
            {
                lastPosition.current = currentPosition;
            }

            createParticlesFromPosition( lastPosition.current, currentPosition );
            lastPosition.current = currentPosition;

            if ( !animationRef.current )
            {
                animateParticles();
            }
        };

        const updateTouchCursor = ( e ) =>
        {
            e.preventDefault();
            const touches = e.touches;
            for ( let i = 0; i < touches.length; i++ )
            {
                const touch = touches[ i ];
                const currentPosition = { x: touch.clientX, y: touch.clientY };

                if ( !lastPosition.current )
                {
                    lastPosition.current = currentPosition;
                }

                createParticlesFromPosition( lastPosition.current, currentPosition );
                lastPosition.current = currentPosition;
            }
        };

        const createParticlesFromPosition = ( start, end ) =>
        {
            const distance = getDistance( start, end );
            if ( distance > 1 )
            {
                const steps = Math.ceil( distance ); // Adjust for desired particle density
                const deltaX = ( end.x - start.x ) / steps;
                const deltaY = ( end.y - start.y ) / steps;

                for ( let i = 0; i < steps; i++ )
                {
                    const intermediatePosition = {
                        x: start.x + deltaX * i,
                        y: start.y + deltaY * i,
                    };
                    createParticle( intermediatePosition );
                }
            }
        };

        const createParticle = ( position ) =>
        {
            const angle = ( Math.random() - 0.5 ) * Math.PI * 1; // Narrower initial angle
            const speed = Math.random() * 0.5 + 0.5; // Lower initial speed

            const particle = {
                x: position.x,
                y: position.y,
                size: Math.random(),
                maxSize: Math.random() * 2 + 2,
                opacity: 1,
                life: 10,
                startTime: Date.now(),
                spreadTime: Math.random() * 1000 + 500, // Time before particles start spreading
                vx: Math.cos( angle ) * speed,
                vy: Math.sin( angle ) * speed,
                growthRate: Math.random() * 0.1 + 0.05,
                fadeRate: 0.1,
                color: Math.random() < 0.5 ? '#C576F6' : '#00f0ff',
            };
            particles.push( particle );
        };

        const animateParticles = () =>
        {
            ctx.clearRect( 0, 0, canvas.width, canvas.height );

            particles.forEach( ( particle, index ) =>
            {
                const elapsedTime = Date.now() - particle.startTime;

                // Increase spread over time
                if ( elapsedTime > particle.spreadTime )
                {
                    const spreadRatio = ( elapsedTime - particle.spreadTime ) / 1000; // Adjust spreading factor
                    particle.vx += Math.random() * spreadRatio - spreadRatio / 2;
                    particle.vy += Math.random() * spreadRatio - spreadRatio / 2;
                }

                particle.x += particle.vx;
                particle.y += particle.vy;

                if ( particle.size < particle.maxSize )
                {
                    particle.size += particle.growthRate;
                }

                ctx.beginPath();
                ctx.arc( particle.x, particle.y, particle.size, 0, Math.PI * 2 );
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                ctx.closePath();

                particle.opacity -= particle.fadeRate;

                if ( particle.life <= 0 || particle.opacity <= 0 )
                {
                    particles.splice( index, 1 );
                }
            } );

            if ( particles.length > 0 )
            {
                animationRef.current = requestAnimationFrame( animateParticles );
            } else
            {
                cancelAnimationFrame( animationRef.current );
                animationRef.current = null;
            }
        };

        const checkTouchDevice = () =>
        {
            isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if ( isTouchDevice.current )
            {
                window.addEventListener( 'touchmove', updateTouchCursor, { passive: false } );
            }
        };

        window.addEventListener( 'mousemove', updateCursor );
        window.addEventListener( 'resize', handleResize );
        checkTouchDevice();

        return () =>
        {
            window.removeEventListener( 'mousemove', updateCursor );
            window.removeEventListener( 'resize', handleResize );
            if ( isTouchDevice.current )
            {
                window.removeEventListener( 'touchmove', updateTouchCursor );
            }
            if ( animationRef.current )
            {
                cancelAnimationFrame( animationRef.current );
            }
        };
    }, [] );

    return <canvas ref={ canvasRef } className="custom-cursor-canvas" />;
}

function getDistance ( pos1, pos2 )
{
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt( dx * dx + dy * dy );
}
