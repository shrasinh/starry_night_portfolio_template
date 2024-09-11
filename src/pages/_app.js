import '@/styles/globals.css';
import Head from 'next/head';
import { Slabo_13px } from 'next/font/google';

const slabo = Slabo_13px( { subsets: [ 'latin' ], weight: '400' } )

export default function MyApp ( { Component, pageProps } )
{
    return (
        <>
            <Head>
                <title>My Portfolio</title>
                <meta name="language" content="en" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <main className={ slabo.className }>
                <Component { ...pageProps } />
            </main>
        </>
    );
}


