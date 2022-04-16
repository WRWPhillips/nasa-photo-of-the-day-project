import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.textColor};
        font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
        transition: all 0.50s linear;
    }
`