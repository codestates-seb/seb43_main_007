import styled from "styled-components";
import ContentsBox from "./ContentsBox";
import editorPickDummyContents from "./editorPickDummyContents";
// import { Post } from "../postdetail/postDetailTypes";
// import usePost from "../../hooks/usePost";

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
      editorPickDummyContents[0],
      editorPickDummyContents[5],
      ...editorPickDummyContents.slice(1),
      editorPickDummyContents[1],
      editorPickDummyContents[0],
   ];
   // const { post } = usePost("18");
   // if (!post) {
   //    return <div>Loading...</div>;
   // }
   // const parseArr: Post[] = [post, post, post, post, post, post, post];
   return (
      <CarouselBoxContainer
         pickNumber={pickNumber}
         carouselTransition={carouselTransition}
      >
         {parseArr.map((pick, idx) => {
            const key = idx;
            return <ContentsBox key={key} post={pick} id={key} />;
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
