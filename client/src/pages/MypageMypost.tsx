import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MyPost from "../components/mypage-mypost/MyPost";
import { myPageMyPost } from "../api/axios";
import type { Board } from "../components/mypage-mypost/myPostDataType.d";
import { RootState } from "../store/store";
import { serverError } from "../util/toastify";

function MypageMypost() {
   // const data = dummyCommentTitleData;
   const [data, setData] = useState<Board[][]>();
   const memberId = useSelector((state: RootState) => state.memberId);
   const [isData, setIsData] = useState(false);

   useEffect(() => {
      myPageMyPost(memberId)
         .then((res) => {
            console.log(memberId);
            setData(res);
         })
         .catch((error) => {
            console.log(error);
            serverError();
         });
   }, [memberId]);

   // 데이터에 맞게 분기 (타이틀 제목과 보드 id리턴)
   const dataTitle =
      data &&
      data[0].map((el: Board) => {
         if (el.title.length > 25) {
            return `${el.title.slice(0, 25)}...`;
         }
         return [el.title.slice(0, 25), el.boardId];
      });

   // 데이터에 맞게 분기 (코멘트 댓글과 보드 id리턴)
   const dataComment =
      data &&
      data[1].map((el: Board) => {
         // console.log(el.boardId);
         if (el.content.length > 25) {
            return `${el.content.slice(0, 25)}...`;
         }
         return [el.content.slice(0, 25), el.boardId];
      });

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
