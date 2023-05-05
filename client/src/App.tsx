import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./style/GlobalStyle";
import Home from "./pages/Home";

function App() {
   return (
      <Container>
         <BrowserRouter>
            <GlobalStyles />
            <div className="navbar">Navbar자리</div>
            <Home />
         </BrowserRouter>
      </Container>
   );
}

export default App;

const Container = styled.div`
   display: flex;
   .navbar {
      background-color: skyblue;
      width: 300px;
      height: 100vh;
   }
`;
