import styled from "styled-components";
import { motion } from "framer-motion";
import MypageTopProfile from "../components/mypage-profile/MypageTopProfile";
import MypageNavbar from "../components/mypage-profile/MypageNavbar";
import BookmarkBox from "../components/mypage-bookmark/BookmarkBox";

function MypageBookmark() {
   return (
      <MypageBookmarkContainer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         exit={{ opacity: 0 }}
      >
         <MypageTopProfile />
         <MypageNavbar />
         <BookmarkBox />
      </MypageBookmarkContainer>
   );
}

export default MypageBookmark;

const MypageBookmarkContainer = styled(motion.div)`
   width: 1080px;
   margin-left: 300px;
   padding-left: 16px;
   padding-top: 16px;
`;
