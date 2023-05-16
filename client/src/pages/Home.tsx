import styled from "styled-components";
import HomeHeader from "../components/home/HomeHeader";
import EditerPick from "../components/home/EditerPick";
import background from "../assets/img/leaf.png";

function Home() {
   return (
      <HomeContainer>
         <HomeHeader />
         <EditerPick />
      </HomeContainer>
   );
}
export default Home;

const HomeContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 1080px;
   background-image: url(${background});
   background-size: 1080px;
   background-repeat: no-repeat;
   // 배경 투명도 조절
   &::before {
      content: "";
      opacity: 0.5;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background-color: #fff;
   }
`;
