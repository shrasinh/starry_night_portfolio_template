import '@/styles/globals.css';
import Head from 'next/head';

export default function MyApp ( { Component, pageProps } )
{
    return (
        <>
            <Head>
                <title>My Portfolio</title>
                <meta name="language" content="en" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <Component { ...pageProps } />
        </>
    );
}


