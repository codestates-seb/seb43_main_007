import { useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import styled from "styled-components";
import { editorImgPost } from "../../api/axios";

type EditorProps = {
   value: string;
   setValue: (a: string) => void;
};

function QuillTextEditor({ value, setValue }: EditorProps) {
   // function QuillTextEditor() {
   // const [value, setValue] = useState(""); // 에디터 내용을 저장하는 상태변수
   const quillRef = useRef<any | null>(); // 에디터 접근을 위한 ref

   // 에디터에서 이미지 클릭시 발동되는 이벤트 핸들러 함수
   const imageHandler = () => {
      console.log("이미지를 클릭하면 이게 나와야해");

      // 이미지를 저장할 input type=file dom을 만든다.
      const input: any | null = document.createElement("input");
      // 속성 생성
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click(); // 에디터에서 이미지 버튼을 클릭하면 이 input이 클릭되고 => 파일 선택창이 나타남

      // input에 변화가 생긴다면 => 이미지를 선택
      input.addEventListener("change", async () => {
         console.log("체인지 이벤트 발동");
         const img = input.files[0];
         console.log(img);

         // // --------------- formData형식으로 만들어서 보내줬는데 오류가 생겼다.
         // // --------------- 파일 자체로 넘겨줬더니 해결이 돼서 넘어갔다 (왜 이러는지 다음에 확인을 해보자(백엔드 설정 관련?))
         // // multer에 맞는 형식으로 데이터를 만들어준다.
         // const formData = new FormData();
         // console.log(formData);
         // formData.append("file", img); // formData는 key-value구조(img-key/file-value)
         // // 백엔드 multer라우터에 이미지를 보낸다.
         // const file = formData.get("file");

         // 밑 try/catch부분을 axios 요청으로 코드를 뺀후 파람을 넘겨서 함수 실행.
         editorImgPost(img, quillRef);

         //    try {
         //       // 백엔드에서 정해준 uri넣어줘야함
         //       const result = await axios.post(
         //          "http://ec2-43-200-182-192.ap-northeast-2.compute.amazonaws.com:8080/boards/photo",
         //          {
         //             file: img,
         //          },
         //          {
         //             headers: {
         //                "Content-Type": "multipart/form-data",
         //             },
         //          }
         //       );
         //       // 백엔드가 보내주는 주소로 받으면 됨
         //       const IMG_URL = result.data;
         //       console.log("이미지 성공");

         //       const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
         //       const range = editor.getSelection(); // 현재 에디터 커서 위치값을 가져오기

         //       // 가져온 위치에 이미지를 삽입하기
         //       editor.insertEmbed(range.index, "image", IMG_URL);
         //    } catch (error) {
         //       console.log("이미지 넣기 실패");
         //       console.log(error);
         //    }
      });
   };

   // 에디터 모듈 ( useMemo 사용하여 재 렌더링 방지)
   const modules = useMemo(() => {
      return {
         toolbar: {
            container: [
               [{ header: [1, 2, 3, 4, 5, 6, false] }],
               [{ font: [] }],
               [{ align: [] }],
               ["bold", "italic", "underline", "strike", "blockquote"],
               [{ list: "ordered" }, { list: "bullet" }, "link"],
               [
                  {
                     color: [
                        "#000000",
                        "#e60000",
                        "#ff9900",
                        "#ffff00",
                        "#008a00",
                        "#0066cc",
                        "#9933ff",
                        "#ffffff",
                        "#facccc",
                        "#ffebcc",
                        "#ffffcc",
                        "#cce8cc",
                        "#cce0f5",
                        "#ebd6ff",
                        "#bbbbbb",
                        "#f06666",
                        "#ffc266",
                        "#ffff66",
                        "#66b966",
                        "#66a3e0",
                        "#c285ff",
                        "#888888",
                        "#a10000",
                        "#b26b00",
                        "#b2b200",
                        "#006100",
                        "#0047b2",
                        "#6b24b2",
                        "#444444",
                        "#5c0000",
                        "#663d00",
                        "#666600",
                        "#003700",
                        "#002966",
                        "#3d1466",
                        "custom-color",
                     ],
                  },
                  { background: [] },
               ],
               ["image"],
               ["clean"],
            ],
            handlers: {
               image: imageHandler,
            },
         },
      };
   }, []);

   return (
      <EditorDiv>
         <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            placeholder="내용을 입력해주세요."
         />
      </EditorDiv>
   );
}

export default QuillTextEditor;

const EditorDiv = styled.div`
   // 에디터 내용 본문크기 (클래스 개발자 도구로 확인가능)
   > div > .ql-container {
      height: 700px;
   }
`;
