import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import GlobalStyles from "./style/GlobalStyle";
import RoutingPage from "./pages/RoutingPage";
import { setMemberId } from "./reducers/memberIdSlice";
import { setIsAdmin } from "./reducers/isAdminSlice";

function App() {
   const dispatch = useDispatch();
   const [cookie, , removeCookie] = useCookies(["isAdmin"]);
   const newMemberId = sessionStorage.getItem("memberId");
   // 세션 스토리지에 memberId가 있으면 전역상태에 넣어준다.
   useEffect(() => {
      if (newMemberId) dispatch(setMemberId(Number(newMemberId)));
      else removeCookie("isAdmin");
   }, [dispatch, newMemberId]);

   // 쿠키에 isAdmin이 있으면 isAdmin을 true로 바꿔준다.
   useEffect(() => {
      if (cookie.isAdmin) dispatch(setIsAdmin(true));
   }, [dispatch, cookie]);

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
