import styled from "styled-components";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useState } from "react";
import CarouselBox from "./CarouselBox";
import { prevHandler, nextHandler } from "./carouselHandler";
import { CarouselHandlerArgsType } from "./homeTypes";

function EditerPick() {
   const [pickNumber, setPickNumber] = useState(1);
   const [disabled, setDisabled] = useState(false);
   const [carouselTransition, setCarouselTransition] = useState(
      "transform 0.5s ease-in-out"
   );
   const argsArr: CarouselHandlerArgsType = [
      pickNumber,
      setPickNumber,
      setCarouselTransition,
      setDisabled,
   ];
   return (
      <EditerPickContainer>
         {!disabled ? (
            <button type="button" className="icon left">
               <BiLeftArrow onClick={() => prevHandler(argsArr)} />
            </button>
         ) : null}
         <div className="carousel">
            <CarouselBox
               pickNumber={pickNumber}
               carouselTransition={carouselTransition}
            />
         </div>
         {!disabled ? (
            <button type="button" className="icon right">
               <BiRightArrow onClick={() => nextHandler(argsArr)} />
            </button>
         ) : null}
      </EditerPickContainer>
   );
}

export default EditerPick;

const EditerPickContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   width: 100%;
   .carousel {
      display: flex;
      width: 800px;
      height: 900px;
      background-color: beige;
      margin-top: 20px;
      overflow: hidden;
   }
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
      left: 5%;
      top: 50%;
      transform: translateY(-50%);
   }
   .right {
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
   }
`;
