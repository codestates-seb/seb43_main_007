import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

function MypageNavbar() {
   const location = useLocation();

   return (
      <MypageNavbarContainer>
         <Link
            to="/mypost"
            className={`nav ${
               location.pathname === "/mypost" ? "selected" : ""
            }`}
         >
            내가 쓴 글
         </Link>
         <Link
            to="/bookmark"
            className={`nav ${
               location.pathname === "/bookmark" ? "selected" : ""
            }`}
         >
            북마크
         </Link>
         <Link
            to="/myprofile"
            className={`nav ${
               location.pathname === "/myprofile" ? "selected" : ""
            }`}
         >
            내 정보
         </Link>
      </MypageNavbarContainer>
   );
}

export default MypageNavbar;

export const MypageNavbarContainer = styled.div`
   margin: 30px 0 50px;
   display: flex;

   .nav {
      padding: 6px 12px;
      border-radius: 1000px;
      color: var(--dark-gray);
      font-size: 13px;
      margin-right: 5px;
      text-decoration: none;
   }

   .nav:hover {
      background-color: var(--third-color1);
      cursor: pointer;
   }

   .selected {
      background-color: var(--third-color3);
      color: white;
   }

   .selected:hover {
      background-color: var(--second-color4);
      color: white;
   }
`;
