const validNickName = (nickname: string) => {
   return nickname.length > 0 && nickname.length <= 10;
};

const validEmail = (email: string) => {
   // 이메일 형식인지 확인
   const valid =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
         email
      );
   return valid;
};

const validPassword = (password: string) => {
   // 영문, 숫자 포함 8자 이상 20자 이하
   const valid = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(password);
   return valid;
};

const validSocialNumber = (socialNumber: string) => {
   // 주민번호 유효한지 확인
   const valid =
      /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])[-]*[1-4]\d{6}/.test(
         socialNumber
      );
   return valid;
};

const validAnswer = (answer: string) => {
   // 빈문자열만 아니면 됨
   return !!answer.length;
};

export default {
   validNickName,
   validEmail,
   validPassword,
   validSocialNumber,
   validAnswer,
};
