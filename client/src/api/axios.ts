import axios from "axios";
import { LoginTypes, FindPasswordType } from "../components/login/LoginType";
import { SignupTypes } from "../components/signup/SignupTypes";
import { request } from "./create";

// 목록페이지 데이터 get요청
export const listData = async (curPage: number) => {
   try {
      const { data } = await request.get(`boards?page=${curPage}`);
      console.log(data);
      return data;
   } catch (error) {
      console.log(error);
   }
};

// 목록페이지 북마크-좋아요 patch요청
export const likeBookMarkPatch = async (endPoint, req) => {
   try {
      const data = await request.patch(`boards/${endPoint}`, req);
      console.log("요청 성공");
      console.log(data);
   } catch (error) {
      console.log("요청 실패");
      console.log(error);
   }
};

// 목록페이지(전체) 검색하기 get요청
export const listSearchGet = async (
   cate?: string,
   title?: string,
   content?: string
) => {
   //    네브바랑 전체페이지  "낚시" 검색시
   // localhost:8080/boards?content=낚시&title=낚시
   try {
      console.log(`/boards?${cate}${title}${content}`);
      const data = await axios.get(`/boards?${cate}${title}${content}`);
      console.log(data);
   } catch (error) {
      console.log(error);
   }
};

// quill에디터 이미지 post요청
export const editorImgPost = async (img: any, quillRef) => {
   try {
      const { data } = await request.post(
         "boards/photo",
         {
            file: img,
         },
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
      );

      const IMG_URL = data;
      const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
      const range = editor.getSelection(); // 현재 에디터 커서 위치값을 가져오기

      // 가져온 위치에 이미지를 삽입하기
      editor.insertEmbed(range.index, "image", IMG_URL);
      // return IMG_URL;
   } catch (error) {
      console.log("axios 파일 실패");
      console.log(error);
   }
};

// 글생성 post요청
export const createPost = async (
   title: string,
   address: string,
   content: string,
   tagList: { tagName: string }[],
   navigate: any
) => {
   try {
      const data = await request.post("/boards", {
         title,
         address,
         content,
         tagNames: tagList,
      });

      if (data.status === 201 || data.status === 200) {
         navigate("/communitylist");
      }
   } catch (error) {
      console.log("글 작성 생성 오류");
      console.log(error);
   }
};

// 로그인 요청
export const loginPost = async (req: LoginTypes) => {
   try {
      const { data } = await request.post("/login", req);
      console.log("성공");
      console.log(data);
      return data;
   } catch (error) {
      console.log("실패");
      console.log(error);
      return null;
   }
};

// 회원가입 요청
export const signupPost = async (req: SignupTypes): Promise<string> => {
   try {
      await request.post("api/members", req);
      return "success";
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return error.response?.data.message;
      }
      return "another error";
   }
};

// 유저 프로필 사진, 닉네임 GET 요청
export const getUserProfile = async () => {
   try {
      const { data } = await request.get("/mebers/mypage/1"); // 나중에 수정
      console.log("성공");
      return data;
   } catch (error) {
      console.log("실패");
      console.error(error);
      return null;
   }
};

// 아이디 찾기 요청
export const findId = async (rrn: string) => {
   try {
      const { data } = await request.get(`members/id?RRNConfirm=${rrn}`);
      console.log("성공");
      console.log(data);
      return data;
   } catch (error) {
      console.log("실패");
      return error;
   }
};

// 비밀번호 찾기 요청
export const findPassword = async (params: FindPasswordType) => {
   const paramsUrl = new URLSearchParams(params).toString();
   try {
      const { data } = await request.get(`members/password?${paramsUrl}`);
      console.log("성공");
      console.log(data);
      return data;
   } catch (error) {
      console.log("실패");
      return error;
   }
};
