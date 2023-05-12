import { LoginTypes } from "../components/login/LoginType";
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

// 목록페이지 좋아요 patch요청
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
export const signupPost = async (req: SignupTypes) => {
   try {
      const data = await request.post("api/members", req);
      console.log("성공");
      console.log(data);
      return data;
   } catch (error) {
      console.log("실패");
      console.log(error);
      return null;
   }
};
