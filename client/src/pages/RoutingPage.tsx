import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
   BsFillArrowLeftCircleFill,
   BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import CommunityList from "./CommunityList";
import MypageProfile from "./MypageProfile";
import Navbar from "../components/NavBar";
import Signup from "./Signup";
import Login from "./Login";
import PostDetail from "./PostDetail";
import CreatePostPage from "./CreatePostPage";
import MypageBookmark from "./MypageBookmark";
import Footer from "../components/footer/Footer";
import MypageMylist from "./MypageMypost";
import PostEdit from "./PostEdit";
import Home from "./Home";
import HomeTree from "./HomeTree";

interface Props {
   isOpen: boolean;
}

function RoutingPage() {
   const { pathname } = useLocation();
   const [condition, setCondition] = useState(true);
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();
   useEffect(() => {
      if (
         pathname === "/signup" ||
         pathname === "/login" ||
         pathname === "/" ||
         pathname === "/home"
      )
         setCondition(false);
      else setCondition(true);
   }, [pathname]);
   return (
      <Container isOpen={isOpen}>
         <div className="nav-container">{condition ? <Navbar /> : null}</div>
         <MainBox>
            {condition ? (
               isOpen ? (
                  <button
                     type="button"
                     className="arrow"
                     onClick={() => setIsOpen(!isOpen)}
                  >
                     <BsFillArrowLeftCircleFill size={25} />
                  </button>
               ) : (
                  <button
                     type="button"
                     className="arrow"
                     onClick={() => setIsOpen(!isOpen)}
                  >
                     <BsFillArrowRightCircleFill size={25} />
                  </button>
               )
            ) : null}
            <AnimatePresence mode="wait">
               <Routes key={location.pathname} location={location}>
                  <Route path="/" element={<HomeTree />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/myprofile" element={<MypageProfile />} />
                  <Route path="/bookmark" element={<MypageBookmark />} />
                  <Route path="/mypost" element={<MypageMylist />} />
                  <Route path="/communitylist" element={<CommunityList />} />
                  <Route
                     path="/communitylist/:cate"
                     element={<CommunityList />}
                  />
                  <Route path="/createpost" element={<CreatePostPage />} />
                  <Route path="/editpost/:boardId" element={<PostEdit />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/post/:boardId" element={<PostDetail />} />
               </Routes>
            </AnimatePresence>
         </MainBox>
         {condition ? <Footer /> : null}
      </Container>
   );
}

export default RoutingPage;

const Container = styled.div<Props>`
   display: flex;
   flex-direction: column;
   width: 100vw;
   height: 100%;
   position: relative;
   .arrow {
      display: none;
   }
   @media all and (max-width: 1375px) {
      .nav-container {
         position: absolute;
         left: ${({ isOpen }) => (isOpen ? "0px" : "-300px")};
         transition: 0.5s;
      }
      .arrow {
         display: flex;
         justify-content: center;
         align-items: center;
         width: 40px;
         font-size: 25px;
         border: none;
         background-color: transparent;
         z-index: 10;
         position: absolute;
         cursor: pointer;
         top: 50%;
         left: ${({ isOpen }) => (isOpen ? "300px" : "0px")};
         transition: 0.5s;
      }
   }
`;

const MainBox = styled.div`
   display: flex;
   /* margin-left: 300px; */
   min-height: 100vh;
   @media all and (max-width: 1375px) {
      display: flex;
      justify-content: center;
      margin: 0;
   }
`;
