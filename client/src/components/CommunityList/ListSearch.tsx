import { useRef, useState } from "react";
import styled from "styled-components";
import useDetectClose from "../../hooks/useDetectClose";
import TitleValue from "./TitleValue";

function ListSearch() {
   const dropDownRef = useRef(null);
   // 드롭다운 상태
   const [title, setTitle] = useState("제목");
   const titlesList = ["제목", "내용", "제목+내용"];
   // 검색창 상태
   const [serach, setSerach] = useState("");
   // console.log(serach);
   const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

   // 드롭다운 버튼 클릭 함수
   const dropDownHandler = () => {
      setIsOpen(!isOpen);
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

   return (
      <DivContainer>
         <DivContent>
            <DivSearch>
               <div ref={dropDownRef} className="title-div">
                  <input
                     value={title}
                     type="button"
                     // onClick={() => setIsOpen(!isOpen)}
                  />
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

                  <button type="button" onClick={dropDownHandler}>
                     ▾
                  </button>
               </div>
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
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
`;

const DivContent = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 800px;
`;

const DivSearch = styled.div`
   display: flex;
   border: 1px solid red;
   width: 70%;

   position: relative;
   > div {
      width: 20%;
   }

   .title-div {
      > input {
         width: 70%;
      }
   }

   .search-div {
      width: 80%;

      > input {
         width: 100%;
      }

      > button {
         position: absolute;
         top: 0;
         margin-top: 0px;
         right: 2px;
         border-radius: 4px;

         cursor: pointer;
      }
   }
`;

const DivCreateText = styled.div`
   border: 1px solid blue;
   width: 20%;
`;

export default ListSearch;
