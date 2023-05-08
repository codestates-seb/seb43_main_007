import styled from "styled-components";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import EditProfile from "../components/mypage-profile/EditProfile";

function MypageProfile() {
   return (
      <MypageProfileContainer>
         <MypageTopProfile />
         <MypageNavbar />
         <EditProfile />
      </MypageProfileContainer>
   );
}

export default MypageProfile;

export const MypageProfileContainer = styled.div`
   width: 1080px;
   border: 1px solid black;
   height: 100vh;
`;
