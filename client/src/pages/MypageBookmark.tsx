import styled from "styled-components";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import BookmarkBox from "../components/mypage-bookmark/BookmarkBox";

function MypageBookmark() {
   return (
      <MypageBookmarkContainer>
         <MypageTopProfile />
         <MypageNavbar />
         <BookmarkBox />
      </MypageBookmarkContainer>
   );
}

export default MypageBookmark;

const MypageBookmarkContainer = styled.div`
   width: 1080px;
   padding-left: 16px;
   padding-top: 16px;
`;
