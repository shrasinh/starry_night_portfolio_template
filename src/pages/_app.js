import '@/styles/globals.css';
import Head from 'next/head';
import { Suspense } from 'react';
import Loader from './loading';

export default function MyApp ( { Component, pageProps } )
{
    return (
        <>
            <Head>
                <title>My Portfolio</title>
                <meta name="language" content="en" />
            </Head>
            <Suspense fallback={ <Loader /> }>
                <Component { ...pageProps } />
            </Suspense>
        </>
    );
}


