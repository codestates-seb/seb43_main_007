import styled from "styled-components";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useState } from "react";
import CarouselBox from "./CarouselBox";
import { prevHandler, nextHandler } from "./carouselHandler";
import { ArgsArr } from "./homeTypes";

function EditerPick() {
   const [pickNumber, setPickNumber] = useState(1);
   const [disabled, setDisabled] = useState(false);
   const [carouselTransition, setCarouselTransition] = useState(
      "transform 0.5s ease-in-out"
   );
   const argsArr: ArgsArr = [
      pickNumber,
      setPickNumber,
      setCarouselTransition,
      setDisabled,
   ];
   return (
      <EditerPickContainer>
         <button type="button" className="icon left" disabled={disabled}>
            <BiLeftArrow onClick={() => prevHandler(argsArr)} />
         </button>
         <CarouselBox
            pickNumber={pickNumber}
            carouselTransition={carouselTransition}
         />
         <button type="button" className="icon right" disabled={disabled}>
            <BiRightArrow onClick={() => nextHandler(argsArr)} />
         </button>
      </EditerPickContainer>
   );
}

export default EditerPick;

const EditerPickContainer = styled.div`
   display: flex;
   position: relative;
   width: 900px;
   height: 800px;
   background-color: beige;
   margin-top: 20px;
   overflow: hidden;
   .icon {
      background-color: transparent;
      border: none;
      font-size: 100px;
      position: absolute;
      transform: scale(1, 1.5);
      z-index: 1;
      cursor: pointer;
   }
   .left {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
   }
   .right {
      right: 0;
      top: 50%;
      transform: translateY(-50%);
   }
`;
