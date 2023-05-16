import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyles from "./style/GlobalStyle";
import RoutingPage from "./pages/RoutingPage";

function App() {
   return (
      <Container>
         <ToastContainer
            position="top-right" // 알람 위치 지정
            autoClose={3000} // 자동 off 시간
         />
         <BrowserRouter>
            <GlobalStyles />
            <RoutingPage />
         </BrowserRouter>
      </Container>
   );
}

export default App;
const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
`;
