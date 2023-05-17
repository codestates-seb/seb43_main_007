import styled from "styled-components";
import ContentsBox from "./ContentsBox";
import { editorPickDummyContents } from "./editorPickDummyContents";

interface Props {
   pickNumber: number;
   carouselTransition: string;
}
interface ContainerT {
   pickNumber: number;
   carouselTransition: string;
}

function CarouselBox({ pickNumber, carouselTransition }: Props) {
   const parseArr = [
      editorPickDummyContents[4],
      editorPickDummyContents[4],
      ...editorPickDummyContents,
      editorPickDummyContents[0],
      editorPickDummyContents[0],
   ];
   return (
      <CarouselBoxContainer
         pickNumber={pickNumber}
         carouselTransition={carouselTransition}
      >
         {parseArr.map((post) => {
            return <ContentsBox key={post.title} post={post} />;
         })}
      </CarouselBoxContainer>
   );
}

export default CarouselBox;

const CarouselBoxContainer = styled.div<ContainerT>`
   display: flex;
   align-items: center;
   transform: translateX(
      ${({ pickNumber }) => {
         return `${-630 - pickNumber * 720}px`;
      }}
   ); //720px씩 넘기기
   transition: ${({ carouselTransition }) => carouselTransition};
`;
