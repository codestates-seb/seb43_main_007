import { useState } from "react";
import CommuDropDown from "./CommuDropDown";

function TitleTagCommuForm() {
   // 제목 상태 변경 함수
   const [title, setTitle] = useState("");
   // 주소 상태 변경 함수
   const [address, setAddress] = useState("");

   // 제목입력 값 핸들러
   const titleValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
   };
   // 주소 입력 값 핸들러
   const addressValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
   };

   return (
      <div>
         <div>
            <div>
               <CommuDropDown />
            </div>
         </div>
         <div>
            <div>제목</div>
            <input
               type="text"
               onChange={titleValueHandler}
               placeholder="제목을 입력하세요."
            />
         </div>
         <div>
            <div>주소</div>
            <input
               type="text"
               onChange={addressValueHandler}
               placeholder="주소를 입력하세요."
            />
         </div>
      </div>
   );
}

export default TitleTagCommuForm;
