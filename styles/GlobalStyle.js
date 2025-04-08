import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.font.base};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
`;
export default GlobalStyle;