'use client';

import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const TwinklingStarsScene = memo( () =>
{
    const twinklingStars = useRef( [] );
    const shootingStarRef = useRef();
    const [ shootingStar, setShootingStar ] = useState( null );
    const [ showShootingStar, setShowShootingStar ] = useState( false );
    const [ transitioning, setTransitioning ] = useState( false );

    // Create star positions and colors
    const { starPositions, starColors } = useMemo( () => createStarPositionsAndColors( 300, 120 ), [] );

    // Randomize the shooting star's start position and ensure it moves diagonally
    useEffect( () =>
    {
        const generateShootingStar = () =>
        {
            const startX = Math.random() * -20; // Off-screen start position
            const startY = Math.random() * 20;
            const startZ = 0;

            const direction = new THREE.Vector3( 1, -1, 0 ).normalize();

            setShootingStar( {
                position: new THREE.Vector3( startX, startY, startZ ),
                velocity: direction.multiplyScalar( 0.1 ), // Adjust speed
            } );

            setTransitioning( true );
            setTimeout( () =>
            {
                setShowShootingStar( true );
                setTransitioning( false );
            }, 1000 ); // Delay to avoid immediate rendering
        };

        const interval = setInterval( () =>
        {
            if ( !transitioning )
            {
                setShowShootingStar( false );
                setTimeout( generateShootingStar, 500 ); // Delay to smoothly transition to the next shooting star
            }
        }, 20000 );

        return () => clearInterval( interval );
    }, [ transitioning ] );

    // Star twinkling effect and shooting star movement
    useFrame( () =>
    {
        twinklingStars.current.forEach( ( star ) =>
        {
            star.material.opacity = 0.5 + Math.sin( Date.now() * 0.005 + star.position.x * 10 ) * 0.5;
        } );

        if ( shootingStar && shootingStarRef.current )
        {
            shootingStar.position.add( shootingStar.velocity );
            shootingStarRef.current.position.copy( shootingStar.position );
        }
    } );

    return (
        <>
            <Stars radius={ 100 } depth={ 50 } count={ 300 } factor={ 4 } saturation={ 0 } fade />
            <ambientLight intensity={ 0.5 } />
            <directionalLight position={ [ 10, 10, 5 ] } />

            { starPositions.map( ( position, index ) => (
                <mesh
                    key={ index }
                    position={ position }
                    ref={ ( el ) => ( twinklingStars.current[ index ] = el ) }
                >
                    <sphereGeometry args={ [ 0.1 + Math.random() * 0.2, 16, 16 ] } />
                    <meshStandardMaterial color={ starColors[ index ] } transparent opacity={ 1 } />
                </mesh>
            ) ) }

            { showShootingStar && shootingStar && (
                <Trail width={ 0.2 } length={ 1 } color={ new THREE.Color( 2, 1, 10 ) } attenuation={ ( t ) => t * t }>
                    <mesh ref={ shootingStarRef }>
                        <sphereGeometry args={ [ 0.02 ] } />
                        <meshBasicMaterial color={ new THREE.Color( 10, 1, 10 ) } />
                    </mesh>
                </Trail>
            ) }
        </>
    );
} );

TwinklingStarsScene.displayName = "TwinklingStarsScene"

export default function TwinklingStars ()
{
    return (
        <div className="absolute inset-0 z-0">
            <Canvas>
                <TwinklingStarsScene />
                <EffectComposer>
                    <Bloom intensity={ 0.5 } mipmapBlur luminanceThreshold={ 1 } />
                </EffectComposer>
            </Canvas>
        </div>
    );
}

// Helper function to create random star positions and fixed colors
function createStarPositionsAndColors ( count, radius )
{
    const positions = [];
    const colors = [];
    for ( let i = 0; i < count; i++ )
    {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos( Math.random() * 2 - 1 );
        const x = radius * Math.sin( phi ) * Math.cos( theta );
        const y = radius * Math.sin( phi ) * Math.sin( theta );
        const z = radius * Math.cos( phi );
        positions.push( new THREE.Vector3( x, y, z ) );

        // Alternate between blue and purple stars
        colors.push( i < count / 2 ? new THREE.Color( '#00f0ff' ) : new THREE.Color( '#C576F6' ) );
    }
    return { starPositions: positions, starColors: colors };
}
