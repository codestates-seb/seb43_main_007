import styled from "styled-components";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MyPost from "../components/mypage-mypost/Mypost";
import dummyCommentTitleData from "../components/mypage-mypost/dummyCommentTitleData";

function MypageMypost() {
   const data = dummyCommentTitleData;
   console.log(data);
   // const dataTitle = data.map((el) => el.title);
   // console.log(dataTitle);
   // const dataComment = data.map((el) => el.content);
   // console.log(dataComment);

   const dataTitleId = data.map((el) => [el.title, el.boardId]);
   console.log(dataTitleId);
   const dataCommentId = data.map((el) => [el.content, el.boardId]);
   console.log(dataCommentId);

   return (
      <MypageMypostContainer>
         <MypageTopProfile />
         <MypageNavbar />
         <DivContents>
            <MyPost title="내가 쓴 글" data={dataTitleId} />
            <MyPost title="내가 쓴 댓글" data={dataCommentId} />
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
   display: flex;
   align-items: center;
   justify-content: space-evenly;
   border: 1px solid blue;
`;
