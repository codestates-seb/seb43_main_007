import styled from "styled-components";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import HomeHeader from "../components/home/HomeHeader";
import EditerPick from "../components/home/EditerPick";
import background from "../assets/img/home-background.jpg";
import { setMemberId } from "../reducers/memberIdSlice";
import { setIsAdmin } from "../reducers/isAdminSlice";
import Navbar from "../components/NavBar";

function Home() {
   // oauth 인증 토큰&멤버 아이디 가져오기
   const searchParams = new URLSearchParams(window.location.search);
   const accessToken = searchParams.get("access_token");
   const memberId = searchParams.get("memberId");
   // 관리자인지 확인
   const isAdmin = searchParams.get("Role")?.slice(1, 6) === "ADMIN";
   const [, setCookie, removeCookie] = useCookies(["accessToken", "isAdmin"]);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (!sessionStorage.getItem("memberId")) {
         if (accessToken && memberId) {
            setCookie("accessToken", accessToken);
            sessionStorage.setItem("memberId", memberId);
            dispatch(setMemberId(Number(memberId)));
            if (isAdmin) {
               setCookie("isAdmin", "true");
               dispatch(setIsAdmin(true));
            } else {
               removeCookie("isAdmin");
            }
            navigate("/home");
         }
      }
   }, []);

   return (
      <HomePageContainer>
         <div>
            <Navbar />
         </div>
         <HomeContainer>
            <HomeHeader />
            <EditerPick />
         </HomeContainer>
      </HomePageContainer>
   );
}
export default Home;

const HomePageContainer = styled.div`
   display: flex;
   justify-content: center;
`;

const HomeContainer = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: 300px;
   align-items: center;
   position: relative;
   width: 1080px;
   background-image: url(${background});
   background-size: 1080px 400px;
   background-repeat: no-repeat;
   /* overflow: hidden; */
   // 배경 투명도 조절
   &::before {
      content: "";
      opacity: 0.5;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
   }
`;
