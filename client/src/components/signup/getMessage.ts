interface GetMessage {
   (
      response: string,
      setMessage: React.Dispatch<
         React.SetStateAction<{
            text1: string;
            text2: string;
         }>
      >,
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
   ): void;
}

const getMessage: GetMessage = (response, setMessage, setIsModalOpen) => {
   let modalMessage = { text1: "", text2: "" };
   switch (response) {
      case "success":
         modalMessage = {
            text1: "회원가입에",
            text2: "성공하셨습니다.",
         };
         break;
      case "Member exists":
         modalMessage = {
            text1: "이미 존재하는",
            text2: "아이디입니다.",
         };
         break;
      case "Member nickname already exists":
         modalMessage = {
            text1: "이미 존재하는",
            text2: "닉네임입니다.",
         };
         break;
      case "Password not same":
         modalMessage = {
            text1: "비밀번호가",
            text2: "일치하지 않습니다.",
         };
         break;
      default:
         modalMessage = {
            text1: "서버 오류입니다.",
            text2: "다시 시도해 주세요.",
         };
   }

   setMessage(modalMessage);
   setIsModalOpen(true);
};

export default getMessage;
