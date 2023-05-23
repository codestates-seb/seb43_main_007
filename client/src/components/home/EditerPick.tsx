import styled from "styled-components";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useState, useEffect } from "react";
import CarouselBox from "./CarouselBox";
import {
   prevHandler,
   nextHandler,
   CarouselHandlerArgsType,
} from "./carouselHandler";
import editorPickDummyContents, {
   EditerPickType,
} from "./editorPickDummyContents";
import { getEditorPick } from "../../api/axios";
import Loading from "../Loading";

function EditerPick() {
   const [pickNumber, setPickNumber] = useState(1);
   const [disabled, setDisabled] = useState(false);
   const [isError, setIsError] = useState(false);
   const [carouselTransition, setCarouselTransition] = useState(
      "transform 0.5s ease-in-out"
   );
   const [pickItems, setPickItems] = useState<EditerPickType[]>([
      editorPickDummyContents[0],
      editorPickDummyContents[0],
      editorPickDummyContents[0],
      editorPickDummyContents[0],
      editorPickDummyContents[0],
   ]);
   const [isLoading, setIsLoading] = useState(true);
   // 관리자 채택글 get 요청
   useEffect(() => {
      const getPick = async () => {
         setIsLoading(true);
         const response = await getEditorPick();
         if (!response) setIsError(true);
         else if (response.length === 0)
            setPickItems([
               editorPickDummyContents[0],
               editorPickDummyContents[0],
               editorPickDummyContents[1],
               editorPickDummyContents[0],
               editorPickDummyContents[0],
            ]);
         else {
            const lastItem = pickItems.length > 4 ? 4 : pickItems.length - 1;
            const newArr = [
               editorPickDummyContents[0],
               response[lastItem],
               response.slice(0, 5),
               response[0],
               editorPickDummyContents[0],
            ];
            setPickItems(newArr);
         }
         setIsLoading(false);
      };
      getPick();
   }, [pickItems]);

   // 버튼 핸들러 함수에 넣을 인자 배열
   const argsArr: CarouselHandlerArgsType = [
      pickNumber,
      setPickNumber,
      setCarouselTransition,
      setDisabled,
      pickItems.length - 4,
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
                  pickItems={pickItems}
                  pickNumber={pickNumber}
                  carouselTransition={carouselTransition}
               />
            </div>
            <div className="text-box">Editor&apos;s Pick!</div>
            {isError ? (
               <div className="error">서버에 문제가 있습니다.</div>
            ) : null}
         </div>
         {!disabled ? (
            <button type="button" className="icon right">
               <BiRightArrow onClick={() => nextHandler(argsArr)} />
            </button>
         ) : null}
         {isLoading ? (
            <LoadingContainer className="loading-container">
               <Loading />
            </LoadingContainer>
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
   .error {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      background: rgba(128, 128, 128, 0.5);
      font-size: 25px;
      transform: translate(-50%, -50%);
   }
`;

const LoadingContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   z-index: 5;
   width: 800px;
   height: 900px;
   background: rgba(128, 128, 128, 0.2);
`;
