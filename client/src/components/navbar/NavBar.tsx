import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHomeAlt2, BiLogOut } from "react-icons/bi";
import { useCookies } from "react-cookie";
import userprofile from "../../assets/img/userprofile.png";
import { getUserProfile } from "../../api/axios";
import { RootState } from "../../store/store";
import { setNickname } from "../../reducers/ProfileNicknameSlice";
import { setPhoto } from "../../reducers/ProfilePhotoSlice";
import { DefaultButton } from "../mypage-profile/EditProfile";
import AirPollution from "./AirPollution";

const collections = [
   { emoji: "🌳", label: "전체", path: "/communitylist" },
   { emoji: "☕️", label: "카페", path: "/communitylist/카페" },
   {
      emoji: "⛽️",
      label: "리필스테이션",
      path: "/communitylist/리필스테이션",
   },
   { emoji: "🍴", label: "식당", path: "/communitylist/식당" },
   { emoji: "🎽", label: "의류", path: "/communitylist/의류" },
   { emoji: "🚙 ", label: "전기차", path: "/communitylist/전기차" },
];

function Navbar() {
   const [, , removeCookie] = useCookies(["accessToken", "isAdmin"]);
   // const [search, setSearch] = useState("");
   const { pathname } = useLocation();

   const memberId = useSelector((state: RootState) => state.memberId);

   const profilePhoto = useSelector(
      (state: RootState) => state.profilePhoto.photo
   );
   const profileNickname = useSelector(
      (state: RootState) => state.profileNickname.nickname
   );

   const navigate = useNavigate();

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

   // 검색창 값 상태 저장하는 함수
   // const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
   //    setSearch(event.target.value);
   // };

   // // 버튼 클릭시 값을 콘솔에 저장하는 함수(ajax요청으로 활용)
   // const searchClickHandler = (event: React.FormEvent<HTMLButtonElement>) => {
   //    event.preventDefault();

   //    console.log(search);
   // };

   // 로그아웃
   const handleLogout = () => {
      removeCookie("accessToken");
      removeCookie("isAdmin");
      sessionStorage.removeItem("memberId");
      navigate(`/`);
      window.location.reload();
   };

   const collectionLinks = collections.map((collection) => (
      <StyledLink to={collection.path} key={collection.label}>
         <span className="collection-emoji">{collection.emoji}</span>
         {collection.label}
      </StyledLink>
   ));

   return (
      <NavbarContainer>
         {memberId === 0 ? (
            <NavProfileContainer to="/login" state={{ pathname }}>
               <img
                  src={userprofile}
                  alt="비회원 프로필 이미지"
                  className="nav-profile-img"
               />
               <div className="nav-profile-nickname">로그인</div>
            </NavProfileContainer>
         ) : (
            <NavProfileContainer to="/myprofile">
               <img
                  src={profilePhoto || userprofile}
                  alt="프로필 이미지"
                  className="nav-profile-img"
               />
               <div className="nav-profile-nickname">{profileNickname}</div>
            </NavProfileContainer>
         )}
         <Line />
         {/* 네브바 검색 구현x 어드밴스 */}
         {/* <NavSearchContainer>
            <div className="nav-searchbar">
               <BiSearch className="search-icon" />
               <input
                  type="text"
                  className="nav-searchbar-input"
                  placeholder="Search"
                  onChange={searchInputHandler}
               />
            </div>
            <SearchButton type="submit" onClick={searchClickHandler}>
               검색
            </SearchButton>
         </NavSearchContainer> */}
         <AirPollution />
         <StyledLink to="/home">
            <BiHomeAlt2 className="home-icon" />
            <span>Home</span>
         </StyledLink>
         <Line />
         <CommunityContainer>
            <span className="community">Community</span>
            <div>{collectionLinks}</div>
         </CommunityContainer>
         <Line />
         <LogoutContainer>
            {memberId !== 0 && (
               <>
                  <BiLogOut className="logout-icon" />
                  <button
                     type="submit"
                     className="logout-btn"
                     onClick={handleLogout}
                  >
                     로그아웃
                  </button>
               </>
            )}
         </LogoutContainer>
      </NavbarContainer>
   );
}

export default Navbar;

export const NavbarContainer = styled.div`
   position: fixed;
   height: 100%;
   z-index: 10;
   padding: 16px;
   width: 300px;
   border-right: 1px solid #e9ecef;
   background-color: #fff;
`;

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

export const Line = styled.div`
   border-bottom: 1px solid #e9ecef;
   margin: 10px -15px;
`;

export const NavSearchContainer = styled.div`
   width: 100%;
   display: flex;
   justify-content: space-between;
   margin-bottom: 10px;

   .nav-searchbar {
      border: 1px solid var(--light-gray);
      height: 30px;
      width: 80%;
      padding: 5px;
      display: flex;
      justify-content: center;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .search-icon {
         color: #868e96;
         margin-right: 5px;
      }
   }

   .nav-searchbar-input {
      height: 100%;
      width: 90%;
      z-index: -1;
      border: none;
      font-size: 12px;

      &::placeholder {
         color: #868e96;
      }

      &:focus {
         outline: none;
      }
   }
`;

export const SearchButton = styled(DefaultButton)`
   height: 30px;
   width: 20%;
   font-size: 12px;
`;

export const StyledLink = styled(Link)`
   text-decoration: none;
   color: black;
   font-size: 13px;
   display: flex;
   align-items: center;
   height: 30px;
   margin: 5px 0;

   &:hover {
      background-color: #f8f9fa;
      font-weight: 600;
   }

   .home-icon {
      height: 15px;
      width: 15px;
      margin-right: 10px;
   }

   .collection-emoji {
      margin-right: 10px;
   }
`;

export const CommunityContainer = styled.div`
   display: flex;
   flex-direction: column;

   .community {
      font-size: 13px;
      color: #868e96;
      margin-bottom: 10px;
   }
`;

export const LogoutContainer = styled.div`
   display: flex;
   align-items: center;

   .logout-icon {
      margin-right: 5px;
      color: var(--dark-gray);
   }

   .logout-btn {
      padding: 0;
      border: none;
      background-color: transparent;
      font-size: 13px;
      color: var(--dark-gray);
      cursor: pointer;

      &:hover {
         color: black;
      }
   }
`;
