import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import CommunityList from "./CommunityList";
import MypageProfile from "./MypageProfile";
import Home from "./Home";
import Navbar from "../components/NavBar";
import Signup from "./Signup";
import Login from "./Login";
import PostDetail from "./PostDetail";
import CreatePostPage from "./CreatePostPage";
import MypageBookmark from "./MypageBookmark";
import Footer from "../components/footer/Footer";
import MypageMylist from "./MypageMypost";
import PostEdit from "./PostEdit";

function RoutingPage() {
   const { pathname } = useLocation();
   const [condition, setCondition] = useState(true);
   useEffect(() => {
      if (pathname === "/signup" || pathname === "/login") setCondition(false);
      else setCondition(true);
   }, [pathname]);
   return (
      <Container>
         {condition ? <Navbar /> : null}
         <MainBox>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/myprofile" element={<MypageProfile />} />
               <Route path="/bookmark" element={<MypageBookmark />} />
               <Route path="/mypost" element={<MypageMylist />} />
               <Route path="/communitylist" element={<CommunityList />} />
               <Route path="/communitylist/:cate" element={<CommunityList />} />
               <Route path="/createpost" element={<CreatePostPage />} />
               <Route path="/editpost/:boardId" element={<PostEdit />} />
               <Route path="/signup" element={<Signup />} />
               <Route path="/login" element={<Login />} />
               <Route path="/post/:boardId" element={<PostDetail />} />
            </Routes>
         </MainBox>
         {condition ? <Footer /> : null}
      </Container>
   );
}

export default RoutingPage;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 100%;
   position: relative;
`;

const MainBox = styled.div`
   display: flex;
   margin-left: 300px;
   min-height: 100vh;
`;
