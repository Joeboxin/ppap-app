import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyle';
import { theme } from '../styles/theme';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <title>PPAP - Anonymous Charity</title>
        <meta name="description" content="Donate crypto or NFTs to causes anonymously. Be the change you want to see." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}