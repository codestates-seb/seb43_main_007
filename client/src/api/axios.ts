import { request } from "./create";

// todo 데이터에 값 추가하기 post메소드
export const postTodos = async (title: string, content: string) => {
   try {
      const { data } = await request.post("boards", {
         title,
         content,
      });
      // getTodoData();
      return data;
   } catch (error) {
      console.log(error);
   }
};
