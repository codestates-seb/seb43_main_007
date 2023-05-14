import styled from "styled-components";
import { useState } from "react";
import GuideLine from "../components/CreatePost/GuideLine";
import QuillTextEditor from "../components/CreatePost/QuillTextEditor";
import TitleTagCommuForm from "../components/CreatePost/TitleTagCommuForm";

function CreatePost() {
   // 제목 상태 변경 함수
   const [title, setTitle] = useState("");
   // 주소 상태 변경 함수
   const [address, setAddress] = useState("");
   const [value, setValue] = useState(""); // 에디터 내용을 저장하는 상태변수

   const createPostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("된다");
      console.log(title);
      console.log(address);
      console.log(value);
   };

   return (
      <FormContainer onSubmit={createPostSubmit}>
         <div className="guide-line">
            <GuideLine />
         </div>
         <div>
            <TitleTagCommuForm setTitle={setTitle} setAddress={setAddress} />
            <QuillTextEditor setValue={setValue} value={value} />
         </div>
         <div className="button-div">
            <button type="submit" className="submit-button">
               등록
            </button>
         </div>
      </FormContainer>
   );
}

export default CreatePost;

const FormContainer = styled.form`
   display: flex;
   flex-direction: column;
   margin: 16px 0px 0px 16px;
   width: 100%;

   .guide-line {
      margin-bottom: 30px;
   }

   .button-div {
      margin-top: 20px;
      height: 50px;
      text-align: end;

      .submit-button {
         background-color: var(--first-color3);
         height: 100%;
         width: 100px;

         border: 0;
         border-radius: 5px;
         outline: none;
         cursor: pointer;

         :active {
            background-color: var(--first-color4);
            color: white;
         }
      }
   }
`;
