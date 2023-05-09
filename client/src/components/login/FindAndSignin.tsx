import styled from "styled-components";

interface Props {
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setCurTab: React.Dispatch<React.SetStateAction<"id" | "password">>;
}

function FindAndSignin({ setIsOpen, setCurTab }: Props) {
   const handleIdFindModal = () => {
      setCurTab("id");
      setIsOpen(true);
   };
   const handlePasswordFindModal = () => {
      setCurTab("password");
      setIsOpen(true);
   };
   return (
      <FindAndSigninContainer>
         <button type="button" className="box">
            회원가입
         </button>
         <button type="button" className="box" onClick={handleIdFindModal}>
            아이디 찾기
         </button>
         <button
            type="button"
            className="box"
            onClick={handlePasswordFindModal}
         >
            비밀번호 찾기
         </button>
      </FindAndSigninContainer>
   );
}

export default FindAndSignin;

const FindAndSigninContainer = styled.div`
   display: flex;
   justify-content: center;
   height: 30px;
   width: 100%;
   .box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
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
   .box:first-child {
      border-radius: 3px 0 0 3px;
   }
   .box:last-child {
      border-right: 0px;
      border-radius: 0 3px 3px 0;
   }
`;
