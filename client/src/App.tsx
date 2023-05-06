import { Button } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./style/GlobalStyle";
import Footer from "./components/footer/Footer";

function App() {
   return (
      <Container>
         <BrowserRouter>
            <GlobalStyles />
            <Button>Click me!</Button>
            <Footer />
         </BrowserRouter>
      </Container>
   );
}

export default App;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 100vh;
`;
