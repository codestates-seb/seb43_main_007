import styled from "styled-components";
import ContentsBox from "./ContentsBox";

interface Props {
   pickNumber: number;
   carouselTransition: string;
}
interface ContainerT {
   pickNumber: number;
   carouselTransition: string;
}

function CarouselBox({ pickNumber, carouselTransition }: Props) {
   const contentsArr = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
   return (
      <CarouselBoxContainer
         pickNumber={pickNumber}
         carouselTransition={carouselTransition}
      >
         {contentsArr.map((content) => {
            return <ContentsBox key={content} content={content} />;
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
