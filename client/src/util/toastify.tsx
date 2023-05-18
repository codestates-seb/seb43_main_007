import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const nicknameChangeSuccess = () =>
   toast.success("닉네임이 성공적으로 변경되었습니다.");

const nicknameChangeRetry = () =>
   toast.error("중복된 닉네임입니다. 다른 닉네임을 시도해주세요.");

const serverError = () =>
   toast.error("서버에 문제가 생겼습니다. 다시 시도해주세요.");

const photoChangeSuccess = () =>
   toast.success("프로필 사진이 성공적으로 변경되었습니다.");

const photoChangeError = () =>
   toast.error("프로필 사진 변경에 실패하였습니다. 다시 시도해주세요.");

const passwordChangeSuccess = () =>
   toast.success("비밀번호가 성공적으로 변경되었습니다.");

const passwordChangeRetry = () =>
   toast.error("현재 비밀번호가 올바르지 않습니다. 다시 입력해주세요.");

const postSuccess = () => toast.success("글 생성!");

const postError = () => toast.error("형식에 맞춰 작성해주세요.");

const postDeleteSuccess = () => toast.success("게시글이 삭제되었습니다.");

export {
   nicknameChangeSuccess,
   nicknameChangeRetry,
   serverError,
   photoChangeSuccess,
   photoChangeError,
   passwordChangeSuccess,
   passwordChangeRetry,
   postSuccess,
   postError,
   postDeleteSuccess,
};
