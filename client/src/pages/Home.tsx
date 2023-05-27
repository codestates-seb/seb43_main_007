import styled from "styled-components";
import { motion } from "framer-motion";
import HomeHeader from "../components/home/HomeHeader";
import EditerPick from "../components/home/EditerPick";
import background from "../assets/img/home-background.jpg";
import Navbar from "../components/NavBar";
import Footer from "../components/footer/Footer";

function Home() {
   return (
      <HomePageContainer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.5 }}
      >
         <div>
            <Navbar />
            <HomeContainer>
               <HomeHeader />
               <EditerPick />
            </HomeContainer>
         </div>
         <Footer />
      </HomePageContainer>
   );
}
export default Home;

const HomePageContainer = styled(motion.div)`
   display: flex;
   flex-direction: column;
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
