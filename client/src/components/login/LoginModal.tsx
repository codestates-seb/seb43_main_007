import styled from "styled-components";

interface Props {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   message: { text1: string; text2: string };
}

function FailModal({ isOpen, setIsOpen, message }: Props) {
   const closeModalHandler = () => {
      setIsOpen(false);
   };
   return (
      <ModalContainer>
         {isOpen ? (
            <ModalBackdrop onClick={closeModalHandler}>
               <ModalView onClick={(e) => e.stopPropagation()}>
                  <span>{message.text1}</span>
                  <span>{message.text2}</span>
                  <button
                     className="confirm"
                     type="button"
                     onClick={closeModalHandler}
                  >
                     확인
                  </button>
               </ModalView>
            </ModalBackdrop>
         ) : null}
      </ModalContainer>
   );
}

export default FailModal;

const ModalContainer = styled.div`
   display: flex;
`;

const ModalBackdrop = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   width: 100%;
   height: 100%;
   background: rgba(128, 128, 128, 0.2);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 15;
`;

const ModalView = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background-color: var(--first-color1);
   width: 25%;
   min-width: 300px;
   height: 200px;
   color: black;
   box-shadow: 2px 3px 5px 0;
   border-radius: 10px;
   overflow: hidden;
   span {
      font-size: var(--font-large);
      color: var(--third-color4);
      margin-bottom: 2%;
   }
   .confirm {
      width: 30%;
      height: 40px;
      margin-top: 3%;
      font-size: var(--font-base);
      color: white;
      cursor: pointer;
      background-color: var(--third-color2);
      border: 2px outset var(--second-color3);
      border-radius: 5px;
      &:hover {
         background-color: var(--third-color3);
         border-color: var(--third-color3);
      }
   }
`;
