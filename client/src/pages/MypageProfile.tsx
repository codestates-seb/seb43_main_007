import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import EditProfile from "../components/mypage-profile/EditProfile";
import ChangePassoword from "../components/mypage-profile/ChangePassoword";
import DeleteAccount from "../components/mypage-profile/DeleteAccount";
import { setPhoto } from "../reducers/profilePhotoSlice";
import { setNickname } from "../reducers/profileNicknameSlice";
import { getUserProfile } from "../api/axios";

function MypageProfile() {
   const dispatch = useDispatch();

   useEffect(() => {
      getUserProfile()
         .then((data) => {
            if (data) {
               dispatch(setNickname(data.nickname));
               dispatch(setPhoto(data.imageUrl));
            }
         })
         .catch((error) => {
            console.error("실패", error);
         });
   }, [dispatch]);

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
`;
