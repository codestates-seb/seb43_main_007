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
         <div className="carousel-container">
            <div className="carousel">
               <CarouselBox
                  pickNumber={pickNumber}
                  carouselTransition={carouselTransition}
               />
            </div>
            <div className="text-box">Editor&apos;s Pick!</div>
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
   z-index: 2;
   .carousel-container {
      display: flex;
      width: 800px;
      height: 900px;
      background-color: transparent;
      position: relative;
      margin-top: 20px;
      .carousel {
         display: flex;
         overflow: hidden;
         width: 800px;
         height: 900px;
         background-color: transparent;
      }
      .text-box {
         display: flex;
         justify-content: center;
         align-items: center;
         position: absolute;
         font-size: 20px;
         font-weight: bold;
         color: black;
         width: 20%;
         height: 5%;
         top: 30px;
         left: 10px;
         background-color: #fff;
         transform: rotate(0.875turn);
         border-radius: 10px;
         border: solid 8px transparent;
         border-radius: 0.8rem;
         &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -8px;
            border-radius: inherit;
            background: linear-gradient(to left, turquoise, greenyellow);
         }
      }
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
