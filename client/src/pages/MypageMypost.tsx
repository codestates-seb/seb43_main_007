import styled from "styled-components";
import { useEffect } from "react";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MyPost from "../components/mypage-mypost/MyPost";
import dummyCommentTitleData from "../components/mypage-mypost/dummyCommentTitleData";
import { myPageMyPost } from "../api/axios";

function MypageMypost() {
   const data = dummyCommentTitleData;
   console.log(data);
   // const dataTitle = data.map((el) => el.title);
   // console.log(dataTitle);
   // const dataComment = data.map((el) => el.content);
   // console.log(dataComment);

   useEffect(() => {
      myPageMyPost(1);
   }, []);

   // 데이터에 맞게 분기
   const dataTitle = data.map((el) =>
      el.boards.map((title) => {
         // 25자 이상넘어가면 뒤에 ...이 붙는 조건문
         if (title.title.length > 25) {
            return `${title.title.slice(0, 25)}...`;
         }
         return title.title.slice(0, 25);
      })
   );
   console.log(dataTitle);
   const dataComment = data.map((el) =>
      el.comments.map((comment) => {
         // 25자 이상넘어가면 뒤에 ...이 붙는 조건문
         if (comment.content.length > 25) {
            return `${comment.content.slice(0, 25)}...`;
         }
         return comment.content.slice(0, 25);
      })
   );
   console.log(dataComment);

   return (
      <MypageMypostContainer>
         <MypageTopProfile />
         <MypageNavbar />
         <DivContents>
            <MyPost title="내가 쓴 글" data={dataTitle} />
            <MyPost title="내가 쓴 댓글" data={dataComment} />
         </DivContents>
      </MypageMypostContainer>
   );
}

export default MypageMypost;

const MypageMypostContainer = styled.div`
   width: 1080px;
   padding-left: 16px;
   padding-top: 16px;
`;

const DivContents = styled.div`
   height: 700px;

   display: flex;
   align-items: center;
   justify-content: space-evenly;
   border-radius: 5px;
   background-color: #fdfaf6;
`;
