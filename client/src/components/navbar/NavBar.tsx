import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, LinkProps } from "react-router-dom";
import { RootState } from "../../store/store";
import NavbarProfile from "./NavbarProfile";
import AirPollution from "./AirPollution";
import Logout from "./Logout";

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
   const memberId = useSelector((state: RootState) => state.memberId);

   const [selectedCategory, setSelectedCategory] = useState("/home");

   const handleCategoryClick = (path: string) => {
      setSelectedCategory(path);
   };

   const collectionLinks = collections.map((collection) => (
      <StyledLink
         to={collection.path}
         key={collection.label}
         selectedCategory={selectedCategory}
         onClick={() => handleCategoryClick(collection.path)}
      >
         <span className="collection-emoji">{collection.emoji}</span>
         {collection.label}
      </StyledLink>
   ));

   return (
      <NavbarContainer>
         <NavbarProfile />
         <Line />
         <AirPollution />
         <StyledLink to="/home">
            <span className="home-icon">🏡</span>
            <span>Home</span>
         </StyledLink>
         <Line />
         <CommunityContainer>
            <span className="community">Community</span>
            <div>{collectionLinks}</div>
         </CommunityContainer>
         {memberId !== 0 && (
            <>
               <Line />
               <Logout />
            </>
         )}
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

export const Line = styled.div`
   border-bottom: 1px solid #e9ecef;
   margin: 10px -15px;
`;

interface StyledLinkProps extends LinkProps {
   selectedCategory?: string;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
   text-decoration: none;
   color: black;
   font-size: 13px;
   display: flex;
   align-items: center;
   height: 30px;
   margin: 5px 0;

   &:hover {
      ${({ to, selectedCategory }) =>
         to !== selectedCategory &&
         `
         background-color: #f8f9fa;
         font-weight: 600;
      `}
   }

   &:active {
      background-color: var(--first-color3);
      font-weight: 800;
   }

   .home-icon {
      margin-right: 10px;
   }

   .collection-emoji {
      margin-right: 10px;
   }

   ${({ to, selectedCategory }) =>
      to === selectedCategory &&
      `
      background-color: var(--first-color3);
      font-weight: 800;
   `}
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
