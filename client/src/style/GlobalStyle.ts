import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
// 일반 pc
@media all and (min-width:1024px) {
    body {
    display: flex;
    justify-content: center;
    }
  #root {
    width :1380px;
  }
} 
    :root {
        --first-color1: #faf1e6;
        --first-color2: #fdfaf6;
        --first-color3: #e4efe7;
        --first-color4: #064420;

        --second-color1: #feffde;
        --second-color2: #ddffbc;
        --second-color3: #91c788;
        --second-color4: #52734d;

        --third-color1: #edf1d6;
        --third-color2: #9dc08b;
        --third-color3: #609966;
        --third-color4: #40513b;

        --dark-gray: #525960;
        
        --font-large: 17px;
        --font-base: 15px;
        --font-small: 10px;
    }
    ${reset}
    *{
        box-sizing: border-box;
    }
    html,
    body,
    body > div { /* the react root */
        margin: 0;
        padding: 0;  
    }
    body {
        font-family: 'Pretendard-Regular';
    }
    #root {
        display: flex;
    }
    ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }
    li {
        padding: 0;
    }
`;

export default GlobalStyles;
