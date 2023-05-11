import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import membership from "../../assets/img/membership.png";
import userprofile from "../../assets/img/userprofile.png";

function MypageTopProfile() {
   const profilePhoto = useSelector(
      (state: RootState) => state.profilePhoto.photo
   );
   const profileNickname = useSelector(
      (state: RootState) => state.profileNickname.nickname
   );
   return (
      <TopProfileContainer>
         <ProfileBox>
            <img
               src={profilePhoto || userprofile}
               alt="user-profile"
               height="150"
               width="150"
            />
            <span className="user-name">{profileNickname || "냥이"}</span>
         </ProfileBox>
         <Membership>
            <img
               src={membership}
               alt="membership-status"
               height="100"
               width="70"
            />
            <span className="membership-title">새싹 멤버</span>
         </Membership>
      </TopProfileContainer>
   );
}

export default MypageTopProfile;

export const TopProfileContainer = styled.div`
   display: flex;
   justify-content: space-between;
`;

export const ProfileBox = styled.div`
   display: flex;
   align-items: center;

   .user-name {
      font-size: 24px;
      font-weight: 700;
      margin-left: 15px;
   }
`;

export const Membership = styled.div`
   width: 150px;
   height: 150px;
   background-color: #feffe1;
   border-radius: 10px;
   box-shadow: -1px 15px 8px -10px rgba(120, 120, 120, 1);
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;

   .membership-title {
      font-size: 12px;
      color: var(--dark-gray);
      margin: 5px 0;
   }
`;