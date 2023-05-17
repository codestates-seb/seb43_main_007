import styled from "styled-components";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MyPost from "../components/mypage-mypost/Mypost";
import MyComments from "../components/mypage-mypost/MyComments";

function MypageMypost() {
   return (
      <MypageMypostContainer>
         <MypageTopProfile />
         <MypageNavbar />
         <DivContents>
            <MyPost />
            <MyComments />
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
