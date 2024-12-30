'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Trail } from '@react-three/drei';

const TwinklingStarsScene = React.memo( function TwinklingStarsScene ()
{
  const twinklingStars = useRef( [] );
  const glowingStars = useRef( [] );
  const shootingStarRef = useRef();
  const [ shootingStar, setShootingStar ] = useState( null );
  const [ showShootingStar, setShowShootingStar ] = useState( false );
  const [ transitioning, setTransitioning ] = useState( false );

  const { starPositions, starColors, glowingStarIndices } = useMemo( () => createStarPositionsAndProperties( 500, 120 ), [] );

  useEffect( () =>
  {
    const generateShootingStar = () =>
    {
      const startX = Math.random() * -20;
      const startY = Math.random() * 20;
      const startZ = 0;

      const direction = new THREE.Vector3( 1, -1, 0 ).normalize();

      setShootingStar( {
        position: new THREE.Vector3( startX, startY, startZ ),
        velocity: direction.multiplyScalar( 0.1 ),
      } );

      setTransitioning( true );
      setTimeout( () =>
      {
        setShowShootingStar( true );
        setTransitioning( false );
      }, 1000 );
    };

    const interval = setInterval( () =>
    {
      if ( !transitioning )
      {
        setShowShootingStar( false );
        setTimeout( generateShootingStar, 500 );
      }
    }, 20000 );

    return () => clearInterval( interval );
  }, [ transitioning ] );

  useFrame( ( state ) =>
  {
    const time = state.clock.getElapsedTime();

    twinklingStars.current.forEach( ( star, index ) =>
    {
      if ( !glowingStarIndices.includes( index ) )
      {
        const scaleFactor = 0.15 + Math.sin( time * 3 + index * 1000 ) * 0.05;
        star.scale.setScalar( scaleFactor );
        star.material.opacity = 0.7 + Math.sin( time * 2 + index * 1000 ) * 0.3;
      }
    } );

    glowingStars.current.forEach( ( star ) =>
    {
      const glowFactor = ( 1.1 + Math.sin( time * 2 ) ) * 1.5;
      star.material.emissiveIntensity = glowFactor;
    } );

    if ( shootingStar && shootingStarRef.current )
    {
      shootingStar.position.add( shootingStar.velocity );
      shootingStarRef.current.position.copy( shootingStar.position );
    }
  } );

  return (
    <>
      { starPositions.map( ( position, index ) => (
        <React.Fragment key={ index }>
          { !glowingStarIndices.includes( index ) && (
            <mesh
              position={ position }
              ref={ ( el ) => ( twinklingStars.current[ index ] = el ) }
            >
              <circleGeometry args={ [ 0.5 ] } />
              <meshBasicMaterial
                color={ starColors[ index ] }
                transparent
                opacity={ 0.8 }
              />
            </mesh>
          ) }
          { glowingStarIndices.includes( index ) && (
            <mesh
              position={ position }
              ref={ ( el ) => ( glowingStars.current[ glowingStarIndices.indexOf( index ) ] = el ) }
            >
              <circleGeometry args={ [ 0.1 ] } />
              <meshStandardMaterial
                color={ starColors[ index ] }
                emissive={ starColors[ index ] }
                emissiveIntensity={ 1.5 }
                opacity={ 0.5 }
              />
            </mesh>
          ) }
        </React.Fragment>
      ) ) }
      { showShootingStar && shootingStar && (
        <Trail color={ new THREE.Color( 2, 1, 10 ) } attenuation={ ( w ) => w * w }>
          <mesh ref={ shootingStarRef }>
            <sphereGeometry args={ [ 0.02 ] } />
            <meshBasicMaterial color={ new THREE.Color( 10, 1, 10 ) } />
          </mesh>
        </Trail>
      ) }
    </>
  );
} );

function createStarPositionsAndProperties ( count, radius )
{
  const positions = [];
  const colors = [];
  const glowingStarIndices = [];
  const starTypes = [
    { color: '#FFFFFF', probability: 0.25 },
    { color: '#FFD700', probability: 0.25 },
    { color: '#FF8C00', probability: 0.25 },
    { color: '#87CEEB', probability: 0.25 },
  ];

  for ( let i = 0; i < count; i++ )
  {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos( Math.random() * 2 - 1 );
    const x = radius * Math.sin( phi ) * Math.cos( theta );
    const y = radius * Math.sin( phi ) * Math.sin( theta );
    const z = radius * Math.cos( phi );
    positions.push( new THREE.Vector3( x, y, z ) );

    const rand = Math.random();
    let colorSum = 0;
    for ( const starType of starTypes )
    {
      colorSum += starType.probability;
      if ( rand <= colorSum )
      {
        colors.push( new THREE.Color( starType.color ) );
        break;
      }
    }

    if ( Math.random() < 0.3 )
    {
      glowingStarIndices.push( i );
    }
  }
  return { starPositions: positions, starColors: colors, glowingStarIndices };
}

export default function TwinklingStars ()
{
  return (
    <div className="absolute inset-0 z-[-1] bg-black">
      <Canvas>
        <TwinklingStarsScene />
        <EffectComposer>
          <Bloom intensity={ 0.5 } luminanceThreshold={ 0.1 } luminanceSmoothing={ 0.9 } />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

