import axios, { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { LoginTypes, FindPasswordType } from "../components/login/loginTypes";
import { SignupTypes } from "../components/signup/contentsArray";
import { request } from "./create";
import { Likereq } from "../components/communityList/listTypes";
import { serverError, postSuccess } from "../util/toastify";
import "moment/locale/ko";

// 목록페이지 데이터 get요청
export const listData = async (
   curPage: number,
   memberId: string,
   cate?: string,
   title?: string,
   content?: string,
   tag?: string
) => {
   try {
      console.log(
         `boards${memberId}?page=${curPage}${cate}${title}${content}${tag}`
      );
      const { data } = await request.get(
         `boards${memberId}?page=${curPage}${cate}${title}${content}${tag}`
      );
      console.log(data);
      return data;
   } catch (error) {
      console.log(error);
      throw error;
   }
};

// 목록페이지 좋아요 요청 post
export const likePost = async (req: Likereq) => {
   try {
      const data = await request.post(`/likes`, req);
      console.log("요청 성공");
      console.log(data);
      return true;
   } catch (error) {
      console.log("요청 실패");
      console.log(error);
      return false;
   }
};

// 목록페이지 북마크 post요청
export const bookMarkPost = async (req: Likereq) => {
   try {
      const data = await request.post("/bookmark", req);
      console.log(data);
   } catch (error) {
      console.log(error);
   }
};

// 목록페이지 핀고정 patch요청
export const pinPost = async (boardId: number) => {
   try {
      console.log(`/boards/pin/${boardId}`);
      await request.post(`/boards/pin/${boardId}`);
   } catch (error) {
      console.log(error);
   }
};

// quill에디터 이미지 post요청
export const editorImgPost = async (img: any, quillRef: any) => {
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
   memberId: number,
   category: string,
   title: string,
   address: string,
   content: string,
   tagList: { tagName: string }[],
   navigate: any
) => {
   try {
      const data = await request.post("/boards", {
         memberId,
         category,
         title,
         address,
         content,
         tagNames: tagList,
      });

      if (data.status === 201 || data.status === 200) {
         postSuccess();
         navigate("/communitylist");
      }
   } catch (error) {
      serverError();
      console.log("글 작성 생성 오류");
      console.log(error);
   }
};

// 마이페이지 내가 쓴 글 get요청
export const myPageMyPost = async (memberId: string | number) => {
   try {
      const { data } = await request.get(`/members/mypage/${memberId}`);
      console.log(data);
      return [data.boards, data.comments];
   } catch (error) {
      console.log(error);
      throw error;
   }
};

// 로그인 요청
export const loginPost = async (
   req: LoginTypes
): Promise<[string, AxiosResponse | number]> => {
   try {
      const response = await request.post("members/login", req);
      // 로그인 성공시 response 반환
      return ["성공", response];
   } catch (error) {
      // 로그인 실패시 에러 코드 반환
      if (axios.isAxiosError(error) && error.response?.status)
         return ["실패", error.response.status];
      return ["실패", 404];
   }
};

// 회원가입 요청
export const signupPost = async (req: SignupTypes): Promise<string> => {
   try {
      await request.post("members", req);
      return "success";
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return error.response?.data.message;
      }
      return "another error";
   }
};

// 유저 프로필 사진, 닉네임 GET 요청
export const getUserProfile = async (memberId: number) => {
   try {
      const { data } = await request.get(`/members/mypage/${memberId}`); // 나중에 수정
      console.log("유저 프로필 사진, 닉네임 GET 성공");
      return data;
   } catch (error) {
      console.log("유저 프로필 사진, 닉네임 GET 실패");
      console.error(error);
      return null;
   }
};

// 아이디 찾기 요청
export const findId = async (rrn: string) => {
   try {
      const { data } = await request.get(`members/id?RRNConfirm=${rrn}`);
      return data;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return error.response?.data.status;
      }
      return 0;
   }
};

// 비밀번호 찾기 요청
export const findPassword = async (params: FindPasswordType) => {
   const paramsUrl = new URLSearchParams(params).toString();
   try {
      const { data } = await request.get(`members/password?${paramsUrl}`);
      return data;
   } catch (error) {
      if (axios.isAxiosError(error)) {
         return error.response?.data.status;
      }
      return 0;
   }
};

// 닉네임 변경
export const updateNickname = async (memberId: number, newNickname: string) => {
   try {
      const { data } = await request.patch(`/members/nickname/${memberId}`, {
         newNickname,
      });
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
         `/members/image/${memberId}`,
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
      const { data } = await request.patch(`/members/password/${memberId}`, {
         nowPassword,
         newPassword,
         passwordConfirm,
      });
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

// 프로필 사진 초기화
export const resetUserProfilePhoto = async (memberId: number) => {
   try {
      const { data } = await request.patch(`/members/deleteimage/${memberId}`, {
         memberId,
      });
      return data;
   } catch (error) {
      console.log("프로필 사진 초기화 실패", error);
      return null;
   }
};

// 회원 탈퇴
export const deleteAccount = async (memberId: number) => {
   try {
      const response = await request.delete(`/members/${memberId}`);
      if (response.status === 204) {
         return "회원탈퇴 성공";
      }
      console.log("Unexpected status code:", response.status);
      return null;
   } catch (error) {
      console.log("회원탈퇴 실패");
      return null;
   }
};

// 게시글 상세 조회
export const getPostData = async (memberId: number, boardId: number) => {
   try {
      const { data } = await request.get(`/boards/board`, {
         params: { memberId, boardId },
      });
      console.log("게시글 조회 성공");
      return data;
   } catch (error) {
      console.log("게시글 조회 실패");
      return null;
   }
};

// 게시글 삭제
export const deletePost = async (boardId: number) => {
   try {
      const response = await request.delete(`/boards/${boardId}`);
      if (response.status === 204) {
         return "게시글 삭제 성공";
      }
      console.log("Unexpected status code:", response.status);
      return null;
   } catch (error) {
      console.log(error);
      return null;
   }
};

// 미세먼지 api
export const dustGet = () => {
   const date = moment().format().slice(0, 10);
   return axios.get(
      `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?ServiceKey=${
         import.meta.env.VITE_DUST_SERVICEKEY
      }&returnType=json&searchDate=${date}`
   );
};

// 대댓글 작성
export const createReply = async (
   boardId: number,
   content: string,
   memberId: number,
   parentId: number
) => {
   try {
      const { data } = await request.post(`/comments`, {
         boardId,
         content,
         memberId,
         parentId,
      });
      console.log("댓글 작성 성공");
      return data;
   } catch (error) {
      console.log("댓글 작성 실패");
      return null;
   }
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
   try {
      const { data } = await request.delete(`/comments/${commentId}`);
      console.log("댓글 삭제 성공");
      return data;
   } catch (error) {
      console.log("댓글 삭제 실패");
      throw error;
   }
};

// 댓글 생성
export const createComment = async (
   memberId: number,
   boardId: number,
   content: string
) => {
   try {
      const data = await request.post("/comments", {
         memberId,
         boardId,
         content,
      });

      if (data.status === 201 || data.status === 200) {
         console.log("댓글 작성 성공");
         return data;
      }
      return null;
   } catch (error) {
      console.log("댓글 생성 오류", error);
      return null;
   }
};

// 댓글 수정
export const editComment = async (
   boardId: number,
   commentId: number,
   memberId: number,
   content: string
) => {
   try {
      const { data } = await request.put(`/comments/${commentId}`, {
         boardId,
         memberId,
         content,
      });
      console.log("댓글 수정 성공");
      return data;
   } catch (error) {
      console.log("댓글 수정 실패");
      return null;
   }
};

// 관리자 채택
export const editorPick = async (boardId: number) => {
   try {
      const { data } = await request.post(`/boards/pick/${boardId}`);
      console.log("관리자 게시글 업데이트 성공");
      return data;
   } catch (error) {
      console.log("관리자 게시글 업데이트 실패");
      return null;
   }
};

// 게시글 수정
export const updatePost = async (
   boardId: number,
   memberId: number,
   category: string,
   title: string,
   address: string,
   content: string,
   tagList: { tagName: string }[]
) => {
   try {
      const { data } = await request.put(`/boards/${boardId}`, {
         memberId,
         category,
         title,
         address,
         content,
         tagNames: tagList,
      });

      console.log("게시글 업데이트 성공");
      return data;
   } catch (error) {
      console.log("게시글 업데이트 실패");
      return null;
   }
};

// 홈 화면 관리자 채택글 get 요청
export const getEditorPick = async () => {
   try {
      const { data } = await request.get("/boards/pickList");
      return data;
   } catch (error) {
      return null;
   }
};
