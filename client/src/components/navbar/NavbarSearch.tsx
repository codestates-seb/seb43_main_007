import styled from "styled-components";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { DefaultButton } from "../mypage-profile/EditProfile";

function NavbarSearch() {
   const [search, setSearch] = useState("");

   // 검색창 값 상태 저장하는 함수
   const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
   };

   // 버튼 클릭시 값을 콘솔에 저장하는 함수(ajax요청으로 활용)
   const searchClickHandler = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };
   return (
      <NavSearchContainer>
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
      </NavSearchContainer>
   );
}

export default NavbarSearch;

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
