import React, { Fragment } from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-size: 16px;
    font-family: Cabin, Arial, sans-serif;
    letter-spacing: normal;
  }
`;

const MyApp = ({ Component, pageProps }) => (
  <Fragment>
    <GlobalStyles />
    <Component {...pageProps} />;
  </Fragment>
);

export default MyApp;
