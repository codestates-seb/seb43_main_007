import styled from "styled-components";
import HomeHeader from "../components/home/HomeHeader";
import EditerPick from "../components/home/EditerPick";
import background from "../assets/img/home-background.jpg";
import Navbar from "../components/navbar/NavBar";

function Home() {
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
