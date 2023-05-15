import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createPost } from "../api/axios";
import GuideLine from "../components/CreatePost/GuideLine";
import QuillTextEditor from "../components/CreatePost/QuillTextEditor";
import TitleTagCommuForm from "../components/CreatePost/TitleTagCommuForm";

// 해야할것
// 유효성 검사
// 제목 비어있으면 등록 안되게
// 주소도 비어있으면 등록 안되게
// 태그 비어있어도됨
// 콘텐츠 10자 이상 + 이미지 무조건 있어야함

function CreatePost() {
   // 제목 상태 변경 함수
   const [title, setTitle] = useState("");
   // 주소 상태 변경 함수
   const [address, setAddress] = useState("");
   // 에디터 내용을 저장하는 상태변수
   const [value, setValue] = useState("");
   // 커뮤니티 값을 가져오는 상태변수(카테고리)
   const [item, setItem] = useState("");
   // 태그를 가지고(배열안에 객체 형식) 있는 상태 변수
   const [tagList, setTagList] = useState<{ tagName: string }[]>([]);

   // 네비게이터 생성
   const navigate = useNavigate();
   const createPostbuttonClick = () => {
      console.log("등록 버튼 눌름");
      createPost(title, address, value, tagList, navigate);
   };

   return (
      <DivContainer>
         <div className="guide-line">
            <GuideLine />
         </div>
         <div>
            <TitleTagCommuForm
               item={item}
               setItem={setItem}
               setTitle={setTitle}
               setAddress={setAddress}
               tagList={tagList}
               setTagList={setTagList}
            />
            <QuillTextEditor setValue={setValue} value={value} />
         </div>
         <div className="button-div">
            <button
               type="button"
               onClick={createPostbuttonClick}
               className="submit-button"
            >
               등록
            </button>
         </div>
      </DivContainer>
   );
}

export default CreatePost;

const DivContainer = styled.div`
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
