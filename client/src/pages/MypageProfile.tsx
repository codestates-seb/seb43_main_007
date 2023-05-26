import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import EditProfile from "../components/mypage-profile/EditProfile";
import ChangePassoword from "../components/mypage-profile/ChangePassoword";
import DeleteAccount from "../components/mypage-profile/DeleteAccount";
import { setPhoto } from "../reducers/ProfilePhotoSlice";
import { setNickname } from "../reducers/ProfileNicknameSlice";
import { getUserProfile } from "../api/axios";
import { RootState } from "../store/store";

function MypageProfile() {
   const dispatch = useDispatch();

   const memberId = useSelector((state: RootState) => state.memberId);
   useEffect(() => {
      const fetchUserProfile = async () => {
         try {
            if (memberId) {
               const data = await getUserProfile(memberId);
               if (data) {
                  dispatch(setNickname(data.nickname));
                  dispatch(setPhoto(data.imageUrl));
               }
            }
         } catch (error) {
            console.error("실패", error);
         }
      };

      fetchUserProfile();
   }, [dispatch, memberId]);

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
   padding-left: 16px;
   padding-top: 16px;
   margin-left: 300px;
`;
