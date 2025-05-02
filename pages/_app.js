import { ThirdwebProvider }       from "@thirdweb-dev/react";
import { ThemeProvider }          from "styled-components";
import GlobalStyle                from "../styles/GlobalStyle";
import { theme }                  from "../styles/theme";
import { StateContextProvider }   from "../context/StateContext";

export default function App({ Component, pageProps }) {
  return (
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
  );
}