import styled from "styled-components";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userprofile from "../../assets/img/userprofile.png";
import { getUserProfile } from "../../api/axios";
import { RootState } from "../../store/store";
import { setNickname } from "../../reducers/ProfileNicknameSlice";
import { setPhoto } from "../../reducers/ProfilePhotoSlice";

interface NavbarProfileProps {
   onClick: () => void;
}

function NavbarProfile({ onClick }: NavbarProfileProps) {
   const memberId = useSelector((state: RootState) => state.memberId);
   const profilePhoto = useSelector(
      (state: RootState) => state.profilePhoto.photo
   );
   const profileNickname = useSelector(
      (state: RootState) => state.profileNickname.nickname
   );

   const { pathname } = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      getUserProfile(memberId)
         .then((data) => {
            if (data) {
               dispatch(setNickname(data.nickname));
               dispatch(setPhoto(data.imageUrl));
            }
         })
         .catch((error) => {
            console.error("실패", error);
         });
   }, [dispatch, memberId]);

   return memberId === 0 ? (
      <NavProfileContainer to="/login" state={{ pathname }}>
         <img
            src={userprofile}
            alt="비회원 프로필 이미지"
            className="nav-profile-img"
         />
         <div className="nav-profile-nickname">로그인</div>
      </NavProfileContainer>
   ) : (
      <NavProfileContainer to="/myprofile" onClick={onClick}>
         <img
            src={profilePhoto || userprofile}
            alt="프로필 이미지"
            className="nav-profile-img"
         />
         <div className="nav-profile-nickname">{profileNickname}</div>
      </NavProfileContainer>
   );
}

export default NavbarProfile;

export const NavProfileContainer = styled(Link)`
   display: flex;
   align-items: center;
   text-decoration: none;
   color: black;

   .nav-profile-img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-right: 10px;
   }
`;
