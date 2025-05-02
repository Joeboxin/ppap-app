import { ThirdwebProvider }       from "@thirdweb-dev/react";
import { ThemeProvider }          from "styled-components";
import GlobalStyle                from "../styles/GlobalStyle";
import { theme }                  from "../styles/theme";
import { StateContextProvider }   from "../context/StateContext";
import Head                       from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>PPAP - Peer-to-Peer Aid Platform</title>
        <link rel="icon" href="/ppap-head.jpg" />
        <meta name="description" content="Decentralized donation platform built on blockchain for transparency and impact." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      activeChain="binance-testnet"
    >
      <StateContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <Component {...pageProps}/>
        </ThemeProvider>
      </StateContextProvider>
    </ThirdwebProvider>
    </>
  );
}