import validFunc from "../../util/signinValidFunc";

export interface SignupTypes {
   nickname: string;
   email: string;
   password: string;
   passwordConfirm: string;
   RRN: string;
   question: string;
   answer: string;
}

interface InputContents {
   labelName: string;
   contents: keyof SignupTypes;
   errorMessage: string;
   validFunction: (v: string) => boolean;
}

const contentsArr: InputContents[] = [
   {
      labelName: "닉네임",
      contents: "nickname",
      errorMessage: "닉네임은 10자 이하입니다.",
      validFunction: validFunc.validNickName,
   },
   {
      labelName: "이메일 아이디",
      contents: "email",
      errorMessage: "유효하지 않은 이메일 형식 입니다.",
      validFunction: validFunc.validEmail,
   },
   {
      labelName: "비밀번호",
      contents: "password",
      errorMessage: "비밀번호는 8자 이상 입니다.",
      validFunction: validFunc.validPassword,
   },
   {
      labelName: "비밀번호확인",
      contents: "passwordConfirm",
      errorMessage: "비밀번호와 일치하지 않습니다.",
      validFunction: () => true,
   },
   {
      labelName: "본인인증 주민번호(숫자만 입력)",
      contents: "RRN",
      errorMessage: "주민번호 형식에 맞게 숫자만 작성해주세요",
      validFunction: validFunc.validSocialNumber,
   },
   {
      labelName: "비밀번호 찾기용 질문",
      contents: "question",
      errorMessage: "",
      validFunction: () => true,
   },
   {
      labelName: "비밀번호 찾기용 답",
      contents: "answer",
      errorMessage: "확실해요?",
      validFunction: validFunc.validAnswer,
   },
];

export default contentsArr;
