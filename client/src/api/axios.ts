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
