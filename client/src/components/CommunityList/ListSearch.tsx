import { useRef, useState } from "react";
import styled from "styled-components";
import useDetectClose from "../../hooks/useDetectClose";
import TitleValue from "./TitleValue";
// import { postTodos } from "../../api/axios";

function ListSearch() {
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
      // postTodos("몰라", "a아아아");
   };

   // 검색창 데이터값 가져오는 핸들러 함수
   const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSerach(event.target.value);
   };
   const searchSubmitHandler = () => {
      console.log(serach);

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
   // const loginAxios = () => {
   //    axios.defaults.withCredentials = true;
   //    axios
   //       .post(
   //          "http://ec2-13-125-39-247.ap-northeast-2.compute.amazonaws.com:8080/auth/login",
   //          {
   //             title: "aws test",
   //             content: "aws test",
   //          },
   //          {
   //             headers: {
   //                "Content-Type": "application/json",
   //                "Access-Control-Allow-Origin": "http://localhost:5173",
   //                "Access-Control-Allow-Headers":
   //                   "Origin, X-Requested-With, Content-Type, Accept",
   //             },
   //          }
   //       )
   //       .then((response) => console.log(response))
   //       .catch((err) => {
   //          /* 응답이 안될때 로그인 상태 변경 / 콘솔 오류코드 */
   //          console.log(err);
   //       });
   // };
   return (
      <DivContainer>
         <DivContent>
            <DivSearch>
               <DivDropdown ref={dropDownRef}>
                  <input
                     value={title}
                     type="button"
                     // onClick={() => setIsOpen(!isOpen)}
                  />
                  <Menu>
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
                        ▴
                     </button>
                  ) : (
                     <button type="button" onClick={dropDownHandler}>
                        ▾
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
            <DivCreateText>
               <button type="button">글쓰기</button>
            </DivCreateText>
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
   border: 1px solid black;
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
         height: 30px;
         width: 90%;
         border: 0;
         background-color: transparent;
         margin-right: 20px;

         outline: none;
      }

      > button {
         position: absolute;
         top: 6px;
         margin-top: 0px;
         margin-right: 10px;
         right: 0px;
         border-radius: 4px;

         height: 30px;

         border: 0;
         background-color: transparent;
         :hover {
            background-color: red;
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

   > button {
      width: 100%;
      height: 100%;

      border: 0;
      background-color: transparent;
   }
`;

const DivDropdown = styled.div`
   border-right: 1px solid black;
   margin: 0px 0px 0px 5px;
   width: 30%;

   > input {
      height: 30px;
      width: 50%;
      border: 0;
      background-color: transparent;
   }
   > button {
      width: 20px;
      border: 0;
      background-color: transparent;

      cursor: pointer;
   }
`;

const Menu = styled.div`
   /* display: flex;
   justify-content: center;
   align-items: center;
   text-align: center; */

   /* border: 1px solid black;
   width: 150px; */

   position: absolute;
   display: flex;
   height: 50px;

   top: 50px;
   left: 0px;

   border-radius: 5px;
   button {
      border: 0;
      background-color: transparent;

      :hover {
         background-color: gray;
         cursor: pointer;
      }
   }

   /* display: none; */
`;

export default ListSearch;
