import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import background from "../assets/img/forest2.jpg";
import { setMemberId } from "../reducers/memberIdSlice";
import { setIsAdmin } from "../reducers/isAdminSlice";

function HomeTree() {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <HomeTreeContainer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.5 }}
      >
         <div className="home-title first">We Gather Together,</div>
         <div className="home-title second">We Save The Earth Together</div>
         <Scroll to="/home">
            <div className="click">Click</div>
            <MdKeyboardDoubleArrowDown className="scroll-icon" />
         </Scroll>
      </HomeTreeContainer>
   );
}

export default HomeTree;

const HomeTreeContainer = styled(motion.div)`
   display: flex;
   width: 100vw;
   height: 100%;
   background-image: url(${background});
   background-size: 100% 100%;
   position: fixed;
   top: 0;
   left: 0;

   .home-title {
      color: white;
      font-size: 4.7vw;
      font-weight: 800;
      position: absolute;
      top: 18vw;
      left: 10vw;
      text-shadow: 1px 1px 2px black, 0 0 1em var(--first-color4),
         0 0 0.2em var(--first-color4);
      opacity: 0;
   }
   .first {
      animation: fadeIn1 1s ease-in-out 0.3s;
      animation-fill-mode: forwards;
   }
   .second {
      top: 28vw;
      left: 30vw;
      animation: fadeIn2 1s ease-in-out 0.9s;
      animation-fill-mode: forwards;
   }
   @keyframes fadeIn1 {
      0% {
         left: 3vw;
         opacity: 0;
      }
      100% {
         left: 10vw;
         opacity: 1;
      }
   }
   @keyframes fadeIn2 {
      0% {
         left: 23vw;
         opacity: 0;
      }
      100% {
         left: 30vw;
         opacity: 1;
      }
   }
`;

const Scroll = styled(Link)`
   position: absolute;
   display: flex;
   justify-content: center;
   bottom: 100px;
   width: 100%;
   .scroll-icon {
      margin-top: 15px;
      font-size: 50px;
      color: white;
      opacity: 0;
      animation: Arrowscroll infinite 2s;
   }
   .click {
      position: absolute;
      color: white;
      animation: Arrowscroll infinite 2s;
   }
   @keyframes Arrowscroll {
      50% {
         transform: translateY(5px);
         opacity: 1;
      }
   }
`;
