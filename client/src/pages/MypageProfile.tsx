import styled from "styled-components";
import MypageTopProfile from "../components/MypageTopProfile";
import MypageNavbar from "../components/MypageNavbar";
import EditProfile from "../components/EditProfile";

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
