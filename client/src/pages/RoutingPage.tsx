import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import CommunityList from "./CommunityList";
import MypageProfile from "./MypageProfile";
import Home from "./Home";
import Navbar from "../components/NavBar";
import Signin from "./Signin";
import Login from "./Login";

function RoutingPage() {
   const { pathname } = useLocation();
   const [condition, setCondition] = useState(true);
   useEffect(() => {
      if (pathname === "/signin" || pathname === "/login") setCondition(false);
      else setCondition(true);
   }, [pathname]);
   return (
      <Container>
         <div className="nav">{condition ? <Navbar /> : null}</div>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myprofile" element={<MypageProfile />} />
            <Route path="/communitylist" element={<CommunityList />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </Container>
   );
}

export default RoutingPage;

const Container = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   position: relative;
   transform: rotate(0);
   padding-left: 300px;
   .nav {
      display: flex;
      position: relative;
      /* flex-direction: column; */
   }
`;
