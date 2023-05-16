import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "../api/axios";
import GuideLine from "../components/createPost/GuideLine";
import QuillTextEditor from "../components/createPost/QuillTextEditor";
import TitleTagCommuForm from "../components/createPost/TitleTagCommuForm";

// 남아 있는 숙제(후순위)
// 1. 본문 유효성 글자수 기준이 애매하다(html 형식이라 html태그또한 글자로 인식)
// 2. 이미지를 유저가 지우면 서버에 딜리트 요청을 하면서 setIsImg또한 false로 다시 바꿔줘야함.

function CreatePost() {
   // ------------------post요청에 필요한 상태변수들
   // 커뮤니티 값을 가져오는 상태변수(카테고리)
   const [item, setItem] = useState("");
   // 제목 상태 변경 함수
   const [title, setTitle] = useState("");
   // 주소 상태 변경 함수
   const [address, setAddress] = useState("");
   // 태그를 가지고(배열안에 객체 형식) 있는 상태 변수
   const [tagList, setTagList] = useState<{ tagName: string }[]>([]);
   // 에디터 내용을 저장하는 상태변수
   const [value, setValue] = useState("");

   // ----------------유효성 검사를 위한 상태변수들
   const [isImg, setIsImg] = useState(false);

   // 네비게이터 생성
   const navigate = useNavigate();

   // notify alert스타일하는 라이브러리
   const notifySuccess = () => toast.success("글 생성!");
   const notifyError = () => toast.error("형식에 맞춰 작성해주세요.");

   // 내용에서 html 태그 제외하고 글자만 빼오기(에디터 내용 유효성 검사)
   const previewBody = value.replace(/(<([^>]+)>)/gi, "").trim();

   const valid = () => {
      // 제목 - 주소 - 카테고리가 빈칸이면 false
      if (title.length === 0 || address.length === 0 || item.length === 0)
         return false;

      // html태그를 제외한 에디터 내용만 30자 이상
      if (!(previewBody.length > 30)) return false;

      // 이미지 여부
      if (!isImg) return false;

      return true;
   };

   const createPostbuttonClick = () => {
      console.log("등록 버튼 눌름");
      const isValid = valid();

      if (isValid) {
         notifySuccess();
         createPost(title, address, value, tagList, navigate);
      } else {
         notifyError();
      }
   };

   return (
      <DivContainer>
         <div className="guide-line">
            <GuideLine />
         </div>
         <div className="section-div">
            <TitleTagCommuForm
               item={item}
               setItem={setItem}
               setTitle={setTitle}
               setAddress={setAddress}
               tagList={tagList}
               setTagList={setTagList}
            />
            <QuillTextEditor
               setValue={setValue}
               value={value}
               setIsImg={setIsImg}
            />
         </div>
         <DivButton>
            <button
               type="button"
               onClick={createPostbuttonClick}
               className="submit-button"
            >
               등록
            </button>
         </DivButton>
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
`;

const DivButton = styled.div`
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
`;
