import { request } from "./create";

// 목록페이지 데이터 get요청
export const listData = async (title: string, content: string) => {
   try {
      const { data } = await request.get("boards");
      return data;
   } catch (error) {
      console.log(error);
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
