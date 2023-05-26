import styled from "styled-components";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import background from "../assets/img/forest2.jpg";

function HomeTree() {
   return (
      <HomeTreeContainer>
         <div className="home-title first">We Gather Together</div>
         <div className="home-title second">We Save The Earth Together</div>
         <Scroll>
            <MdKeyboardDoubleArrowDown className="scroll-icon" />
         </Scroll>
      </HomeTreeContainer>
   );
}

export default HomeTree;

const HomeTreeContainer = styled.div`
   display: flex;
   width: 100vw;
   height: 100%;
   background-image: url(${background});
   background-size: 100% 100%;
   position: relative;

   .home-title {
      color: white;
      font-size: 100px;
      font-weight: 800;
      position: absolute;
      top: 300px;
      left: 200px;
      text-shadow: 1px 1px 2px black, 0 0 1em var(--first-color4),
         0 0 0.2em var(--first-color4);
   }

   .second {
      top: 500px;
      left: 750px;
   }
`;

const Scroll = styled.article`
   position: absolute;
   display: flex;
   justify-content: center;
   bottom: 100px;
   width: 100%;
   .scroll-icon {
      margin-top: 5px;
      font-size: 50px;
      color: white;
      opacity: 0;
      animation: Arrowscroll infinite 2s;
   }
   @keyframes Arrowscroll {
      50% {
         transform: translateY(5px);
         opacity: 1;
      }
   }
`;
