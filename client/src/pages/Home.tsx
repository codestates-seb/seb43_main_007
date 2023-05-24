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

function Home() {
   // oauth 인증 토큰&멤버 아이디 가져오기
   const searchParams = new URLSearchParams(window.location.search);
   const accessToken = searchParams.get("access_token");
   const memberId = searchParams.get("memberId");
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
            navigate("/");
         }
      }
   }, []);
   return (
      <HomeContainer>
         <HomeHeader />
         <EditerPick />
         <div className="bird-container bird-container--one">
            <div className="bird bird--one" />
         </div>

         <div className="bird-container bird-container--two">
            <div className="bird bird--two" />
         </div>
      </HomeContainer>
   );
}
export default Home;

const HomeContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   width: 1080px;
   background-image: url(${background});
   background-size: 1080px 400px;
   background-repeat: no-repeat;
   overflow: hidden;
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

   .bird {
      background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/174479/bird-cells-new.svg);
      background-size: auto 100%;
      width: 88px;
      height: 125px;
      will-change: background-position;

      animation-name: fly-cycle;
      animation-timing-function: steps(10);
      animation-iteration-count: infinite;

      &--one {
         animation-duration: 1s;
         animation-delay: -0.5s;
      }

      &--two {
         animation-duration: 0.9s;
         animation-delay: -0.75s;
      }
   }

   .bird-container {
      position: absolute;
      top: 10%;
      left: -30%;
      width: 100%;
      transform: scale(0) translateX(-10%);
      will-change: transform;
      z-index: 1;
      animation-name: fly-right-one;
      animation-timing-function: linear;
      animation-iteration-count: infinite;

      &--one {
         animation-duration: 15s;
         animation-delay: 0;
      }

      &--two {
         animation-duration: 16s;
         animation-delay: 1s;
      }
   }

   @keyframes fly-cycle {
      100% {
         background-position: -900px 0;
      }
   }

   @keyframes fly-right-one {
      0% {
         transform: scale(0.3) translateX(-10%);
      }

      20% {
         transform: translateY(0vh) translateX(15%) scale(0.5);
      }

      40% {
         transform: translateY(2vh) translateX(40%) scale(0.6);
      }

      60% {
         transform: translateY(0vh) translateX(60%) scale(0.6);
      }

      80% {
         transform: translateY(0vh) translateX(80%) scale(0.6);
      }

      100% {
         transform: translateY(0vh) translateX(100%) scale(0.6);
      }
   }
`;
