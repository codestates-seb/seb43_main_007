import styled from "styled-components";
import ContentsBox from "./ContentsBox";
import { EditerPickType } from "./editorPickDummyContents";

interface Props {
   pickItems: EditerPickType[];
   pickNumber: number;
   carouselTransition: string;
}
interface ContainerT {
   pickNumber: number;
   carouselTransition: string;
}

function CarouselBox({ pickItems, pickNumber, carouselTransition }: Props) {
   return (
      <CarouselBoxContainer
         pickNumber={pickNumber}
         carouselTransition={carouselTransition}
      >
         {pickItems.map((pick, idx) => {
            const key = idx;
            return <ContentsBox key={key} pick={pick} id={key} />;
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
         return `${-680 - pickNumber * 720}px`;
      }}
   ); //720px씩 넘기기
   transition: ${({ carouselTransition }) => carouselTransition};
`;
