import axios, { AxiosError } from "axios";
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

// 닉네임 변경
export const updateNickname = async (memberId: number, newNickname: string) => {
   try {
      const { data } = await request.patch(
         `/api/members/nickname/${memberId}`,
         {
            newNickname,
         }
      );
      console.log("닉네임 변경 성공");
      return data;
   } catch (error) {
      const axiosError = error as AxiosError;
      console.log("닉네임 변경 실패", axiosError);
      if (axiosError.response) {
         const { status } = axiosError.response;
         if (status === 400) {
            throw new Error("닉네임 중복");
         } else if (status === 404) {
            throw new Error("서버 오류");
         }
      }
      throw new Error("닉네임 변경 실패");
   }
};

// 프로필 사진 변경
export const updateUserProfilePhoto = async (memberId: number, file: File) => {
   try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await request.patch(
         `/api/members/image/${memberId}`,
         formData,
         {
            headers: {
               "Content-Type": "multipart/form-data",
            },
         }
      );
      console.log("프로필 사진 변경 성공");
      return data;
   } catch (error) {
      const axiosError = error as AxiosError;
      console.log("프로필 사진 변경 실패", axiosError);
      return null;
   }
};

// 비밀번호 변경
export const updatePassword = async (
   memberId: number,
   nowPassword: string,
   newPassword: string,
   passwordConfirm: string
) => {
   try {
      const { data } = await request.patch(
         `/api/members/password/${memberId}`,
         {
            nowPassword,
            newPassword,
            passwordConfirm,
         }
      );
      console.log("비밀번호 변경 성공");
      return data;
   } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
         const { status } = axiosError.response;
         if (status === 400) {
            throw new Error("현재 비밀번호 불일치");
         } else if (status === 404) {
            throw new Error("서버 오류");
         }
      }
      console.log("비밀번호 변경 실패", axiosError);
      throw new Error("비밀번호 변경 실패");
   }
};
