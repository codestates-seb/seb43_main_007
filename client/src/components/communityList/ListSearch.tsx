import { Dispatch, SetStateAction, useRef } from "react";
import styled, { css } from "styled-components";
import { BiUpArrowCircle, BiDownArrowCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useDetectClose from "../../hooks/useDetectClose";
import TitleValue from "./TitleValue";

type SearchProps = {
   search: string;
   setSearch: Dispatch<SetStateAction<string>>;
   setTitle: Dispatch<SetStateAction<string>>;
   title: string;
   searchSubmitHandler: () => void;
   titlesList: string[];
};

// 프롭으로 상태변경 함수를 넘겨서 검색후 get데이터를 부모로 넘겨준다.
function ListSearch({
   search,
   setSearch,
   setTitle,
   title,
   searchSubmitHandler,
   titlesList,
}: SearchProps) {
   const dropDownRef = useRef(null);

   // 드롭다운 클릭 여부
   const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

   // 드롭다운 버튼 클릭 함수
   const dropDownHandler = () => {
      setIsOpen(!isOpen);
   };

   // 검색창 데이터값 가져오는 핸들러 함수
   const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
   };

   const searchEnterHandler = (
      event: React.KeyboardEvent<HTMLInputElement>
   ) => {
      if (event.key === "Enter") {
         event.preventDefault();
         searchSubmitHandler();
      }
   };

   // 글쓰기 버튼 핸들러
   const navigate = useNavigate();
   const createPostHandler = () => {
      navigate("/createpost");
   };

   return (
      <DivContainer>
         <DivContent>
            <DivSearch>
               {/* 드롭다운 */}
               <DivDropdown ref={dropDownRef}>
                  <input
                     value={title}
                     type="button"
                     // onClick={() => setIsOpen(!isOpen)}
                  />
                  <Menu isOpen={isOpen}>
                     {isOpen && (
                        <ul>
                           {titlesList.map((el, idx) => {
                              const key = idx;
                              return (
                                 <TitleValue
                                    key={key}
                                    value={el}
                                    setIsOpen={setIsOpen}
                                    setTitle={setTitle}
                                    isOpen={isOpen}
                                 />
                              );
                           })}
                        </ul>
                     )}
                  </Menu>
                  {isOpen ? (
                     <button type="button" onClick={dropDownHandler}>
                        <BiUpArrowCircle size="25" onClick={dropDownHandler} />
                     </button>
                  ) : (
                     <button type="button" onClick={dropDownHandler}>
                        <BiDownArrowCircle
                           size="25"
                           onClick={dropDownHandler}
                        />
                     </button>
                  )}
               </DivDropdown>
               <div className="search-div">
                  <input
                     type="text"
                     value={search}
                     onChange={searchHandler}
                     onKeyPress={searchEnterHandler}
                  />
                  <button type="submit" onClick={searchSubmitHandler}>
                     검색
                  </button>
               </div>
            </DivSearch>
            <div>
               <DefaultButton type="button" onClick={createPostHandler}>
                  글쓰기
               </DefaultButton>
            </div>
         </DivContent>
      </DivContainer>
   );
}

const DivContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;

   width: 1050px;
   height: 100px;

   @media (max-width: 1023px) {
      width: 700px;
   }
`;

const DivContent = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   height: 70%;
`;

const DivSearch = styled.div`
   display: flex;
   align-items: center;
   border: 3px solid #064420;
   border-radius: 5px;
   width: 70%;
   height: 45px;
   text-align: center;

   position: relative;
   > div {
      width: 20%;
   }

   // 검색창
   .search-div {
      width: 80%;
      @media (max-width: 1023px) {
         width: 100px;
      }

      > input {
         text-align: left;
         height: 30px;
         width: 500px;
         border: 0;
         background-color: transparent;
         margin-right: 60px;

         outline: none;
      }

      > button {
         position: absolute;
         top: 6px;
         margin-top: 0px;
         margin-right: 5px;
         right: 0px;
         border-radius: 4px;
         width: 70px;
         height: 30px;

         border: 0;
         background-color: transparent;
         :hover {
            background-color: var(--first-color4);
            color: white;
            cursor: pointer;
         }
      }
   }
`;

const DefaultButton = styled.button`
   height: 45px;
   width: 150px;
   background-color: var(--first-color3);
   border-radius: 3px;
   border: 1px solid #c4dccb;
   color: var(--first-color4);
   cursor: pointer;
   font-size: 13px;
   font-weight: 400;
   outline: none;
   text-align: center;
   transition-duration: 3ms;

   &:hover:not(:disabled) {
      background-color: #d4e6d9;
   }

   &:active:not(:disabled) {
      background-color: #c4dccb;
   }

   &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
   }
`;

const DivDropdown = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;

   border-right: 3px solid #064420;
   margin: 0px 0px 0px 5px;
   width: 30%;

   > input {
      height: 30px;
      width: 50%;
      border: 0;
      background-color: transparent;
   }
   > button {
      width: 40px;
      border: 0;
      background-color: transparent;

      cursor: pointer;

      > svg {
         pointer-events: none;
      }
   }
`;

const Menu = styled.div<{ isOpen: boolean }>`
   ${({ isOpen }) =>
      isOpen &&
      css`
         /* border: 1px solid black; */
         border-top: none;
         height: 70px;
         width: 150px;

         background-color: #e4efe7;

         position: absolute;
         display: flex;

         top: 44px;
         left: 0px;

         border-radius: 0px 0px 5px 5px;

         @keyframes dropdown {
            0% {
               transform: translateY(-10%);
            }
            100% {
               transform: translateY(0);
            }
         }
         animation: dropdown 0.4s ease;
      `};

   button {
      border: 0;
      background-color: transparent;

      :hover {
         background-color: #fdfaf6;
         cursor: pointer;
      }
   }

   /* display: none; */
`;

export default ListSearch;
