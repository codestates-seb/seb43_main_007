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
   switch (response) {
      case "success":
         setMessage({
            text1: "회원가입에",
            text2: "성공하셨습니다.",
         });
         setIsModalOpen(true);
         break;
      case "Member exists":
         setMessage({
            text1: "이미 존재하는",
            text2: "아이디입니다.",
         });
         setIsModalOpen(true);
         break;
      case "Member nickname already exists":
         setMessage({
            text1: "이미 존재하는",
            text2: "닉네임입니다.",
         });
         setIsModalOpen(true);
         break;
      case "Password not same":
         setMessage({
            text1: "비밀번호가",
            text2: "일치하지 않습니다.",
         });
         setIsModalOpen(true);
         break;
      default:
         setMessage({
            text1: "서버 오류입니다.",
            text2: "다시 시도해 주세요.",
         });
         setIsModalOpen(true);
   }
};

export default getMessage;
