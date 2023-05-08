import styled from "styled-components";

function FindAndSignin() {
   return (
      <FindAndSigninContainer>
         <button type="button" className="box">
            회원가입
         </button>
         <button type="button" className="box">
            아이디찾기
         </button>
         <button type="button" className="box">
            비밀번호찾기
         </button>
      </FindAndSigninContainer>
   );
}

export default FindAndSignin;

const FindAndSigninContainer = styled.div`
   display: flex;
   height: 30px;
   .box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 100%;
      font-size: var(--font-base);
      color: var(--third-color4);
      border: none;
      border-right: 1px solid black;
      background-color: transparent;
      cursor: pointer;
      transition-duration: 0.2s;
      &:hover {
         background-color: var(--second-color3);
         color: white;
         transition-duration: 0.2s;
      }
   }
   .box:last-child {
      border-right: 0px;
   }
`;
