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
