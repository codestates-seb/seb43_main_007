import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { BiUpArrowCircle, BiDownArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useDetectClose from "../../hooks/useDetectClose";
import TitleValue from "./TitleValue";
import { listSearchGet } from "../../api/axios";
import { RootState } from "../../store/store";
import { setMemberId } from "../../reducers/memberIdSlice";
import { ListData, PageInfo } from "./listTypes";

type SearchProps = {
   setDatas: (a: ListData[]) => void;
   setPageInfo: (a: PageInfo | undefined) => void;
};

// 프롭으로 상태변경 함수를 넘겨서 검색후 get데이터를 부모로 넘겨준다.
function ListSearch({ setDatas, setPageInfo }: SearchProps) {
   const { cate } = useParams();
   // console.log(cate);

   const dropDownRef = useRef(null);
   // 드롭다운 상태
   const [title, setTitle] = useState("제목");
   const titlesList = ["제목", "내용", "제목+내용"];

   // 검색창 상태
   const [serach, setSerach] = useState("");
   const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

   // 드롭다운 버튼 클릭 함수
   const dropDownHandler = () => {
      setIsOpen(!isOpen);
   };

   // 검색창 데이터값 가져오는 핸들러 함수
   const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSerach(event.target.value);
   };

   const dispatch = useDispatch();
   dispatch(setMemberId(1));
   const memberId = useSelector((state: RootState) => state.memberId);

   const searchSubmitHandler = async () => {
      console.log(serach);
      let data;
      if (cate === undefined) {
         if (title === "제목") {
            console.log("제목 실행?");
            data = await listSearchGet(
               `/${memberId}`,
               ``,
               `title=${serach}`,
               ""
            );
         }
         if (title === "내용") {
            console.log("내용 실행?");
            data = await listSearchGet(
               `/${memberId}`,
               "",
               "",
               `content=${serach}`
            );
         }
         if (title === "제목+내용") {
            console.log("제목+내용 실행?");
            data = await listSearchGet(
               `/${memberId}`,
               "",
               `title=${serach}&`,
               `content=${serach}`
            );
         }
      } else {
         if (title === "제목") {
            console.log("제목 실행?");
            data = await listSearchGet(
               `/${memberId}`,
               `cate=${cate}&`,
               `title=${serach}`,
               ""
            );
         }
         if (title === "내용") {
            console.log("내용 실행?");
            data = await listSearchGet(
               `/${memberId}`,
               `cate=${cate}&`,
               "",
               `content=${serach}`
            );
         }
         if (title === "제목+내용") {
            console.log("제목+내용 실행?");
            data = await listSearchGet(
               `/${memberId}`,
               `cate=${cate}&`,
               `title=${serach}&`,
               `content=${serach}`
            );
         }
         // 검색하면 새로운 데이터가 담길 수 있게함
         setDatas(data.data);
         setPageInfo(data.pageInfo);
      }

      setSerach("");
   };
   const searchEnterHandler = (
      event: React.KeyboardEvent<HTMLInputElement>
   ) => {
      if (event.key === "Enter") {
         event.preventDefault();
         searchSubmitHandler();
      }
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
                           {titlesList.map((el, idx) => (
                              <TitleValue
                                 key={idx}
                                 value={el}
                                 setIsOpen={setIsOpen}
                                 setTitle={setTitle}
                                 isOpen={isOpen}
                              />
                           ))}
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
                     value={serach}
                     onChange={searchHandler}
                     onKeyPress={searchEnterHandler}
                  />
                  <button type="submit" onClick={searchSubmitHandler}>
                     검색
                  </button>
               </div>
            </DivSearch>
            <Link to="/createpost">
               <DivCreateText>
                  <button type="button">글쓰기</button>
               </DivCreateText>
            </Link>
         </DivContent>
      </DivContainer>
   );
}

const DivContainer = styled.div`
   /* border: 1px solid orange; */

   display: flex;
   justify-content: center;
   align-items: center;

   width: 1050px;
   height: 100px;
   margin-left: 30px;
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

// 글쓰기 생성
const DivCreateText = styled.div`
   text-align: right;
   width: 150px;
   height: 45px;

   border-radius: 4px;
   background-color: var(--third-color2);

   :hover {
      background-color: var(--first-color4);
   }

   > button {
      width: 100%;
      height: 100%;
      color: white;
      cursor: pointer;

      border: 0;
      background-color: transparent;
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
