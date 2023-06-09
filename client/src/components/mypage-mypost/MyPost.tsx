import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EditorPick } from "../postdetail/PostTitle";
// import { CommentType } from "./dummyCommentTitleData";

type MypostProps = {
   title: string;
   data: (string | (string | number)[])[] | undefined;
   editerPick?: number[];
};

function MyPost({ title, data, editerPick }: MypostProps) {
   const [isData, setIsData] = useState(false);
   // (에디터 픽 - 구현은 성공! 작동은 실패 - 관리자로 사용자 바뀜)
   const isEditerPick = editerPick && editerPick[0];

   useEffect(() => {
      if (data?.length === 0) {
         setIsData(false);
      } else {
         setIsData(true);
      }
   }, [data?.length]);
   return (
      <DivContainer>
         <div className="title-div">{title}</div>
         <UlPostsStyle>
            {isData ? (
               data?.map((el, idx) => {
                  const key = idx;
                  return (
                     <LiPostStyle key={key}>
                        <Link to={`/post/${el[1]}`}>
                           {isEditerPick ? (
                              <EditorPick>Editor&apos;s Pick</EditorPick>
                           ) : null}
                           <div className="number">{idx + 1}.</div>
                           <div>{el[0]}</div>
                        </Link>
                     </LiPostStyle>
                  );
               })
            ) : (
               <div className="error-data">게시 된 글이 없습니다.</div>
            )}
         </UlPostsStyle>
      </DivContainer>
   );
}

export default MyPost;

const DivContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   border-radius: 5px;
   background-color: white;
   width: 350px;
   height: 500px;
   text-align: center;

   .title-div {
      font-size: 25px;
   }

   overflow-y: scroll;
`;

const UlPostsStyle = styled.ul`
   padding: 0px;
   margin-top: 30px;
   width: 100%;
   text-align: left;

   height: 100%;

   .error-data {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70%;

      color: var(--third-color3);
   }
`;

const LiPostStyle = styled.li`
   margin: 10px 5px 10px 5px;
   height: 30px;

   cursor: pointer;
   border-bottom: 2px solid #eef1d8;

   a {
      display: flex;

      text-decoration: none;
      color: black;

      .number {
         width: 25px;
      }

      :hover {
         color: var(--first-color4);
         text-decoration: underline;
      }
   }
`;
