import styled from "styled-components";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import EditProfile from "../components/mypage-profile/EditProfile";
import ChangePassoword from "../components/mypage-profile/ChangePassoword";
import DeleteAccount from "../components/mypage-profile/DeleteAccount";

function MypageProfile() {
   return (
      <MypageProfileContainer>
         <MypageTopProfile />
         <MypageNavbar />
         <EditProfile />
         <ChangePassoword />
         <DeleteAccount />
      </MypageProfileContainer>
   );
}

export default MypageProfile;

export const MypageProfileContainer = styled.div`
   width: 1080px;
   height: 100vh;
   padding-left: 16px;
   padding-top: 16px;
`;
