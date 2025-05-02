import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0; 
    padding: 0;
    background: ${({ theme }) => theme.colors.background};
    color:      ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
  }
  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
