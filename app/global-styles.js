import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  font-size: 65%;
  height: 100%;
}
*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
  #root {
    background: #D5F5E3;
    min-height: 100%;
    min-width: 100%;
  }
  body {
    background: #D5DBDB;
    font-size: 10px;
    overflow-x:hidden ;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    margin-top: 0px !important;
    height: 100%;
  }
  img {
    border: 0;
  }
  li{
    list-style-type:none;
  }
  a{
    text-decoration:none;
  }
  input:focus,
  textarea:focus,
  button:focus,
  a:focus,
  
  article:focus {
    outline: none !important;
    border:none;
  }
`;

export default GlobalStyle;
