import styled from "styled-components";
import FindId from "./FindId";
import FindPassword from "./FindPassword";

interface Props {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   curTab: "id" | "password";
   setCurTab: React.Dispatch<React.SetStateAction<"id" | "password">>;
}

function FindModal({ isOpen, setIsOpen, curTab, setCurTab }: Props) {
   const closeModalHandler = () => {
      setIsOpen(false);
   };
   return (
      <ModalContainer>
         {isOpen ? (
            <ModalBackdrop onClick={closeModalHandler}>
               <ModalView onClick={(e) => e.stopPropagation()}>
                  <div className="tab">
                     <button
                        type="button"
                        className={`id ${curTab === "id" ? "active" : ""}`}
                        onClick={() => setCurTab("id")}
                     >
                        아이디 찾기
                     </button>
                     <button
                        type="button"
                        className={`password ${
                           curTab === "password" ? "active" : ""
                        }`}
                        onClick={() => setCurTab("password")}
                     >
                        비밀번호 찾기
                     </button>
                  </div>
                  {curTab === "id" ? <FindId /> : <FindPassword />}
               </ModalView>
            </ModalBackdrop>
         ) : null}
      </ModalContainer>
   );
}

export default FindModal;

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
   z-index: 10;
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
   background-color: var(--second-color1);
   width: 500px;
   height: 50%;
   color: black;
   box-shadow: 2px 3px 5px 0;
   border-radius: 10px;
   overflow: hidden;
   .tab {
      width: 100%;
      height: 15%;
      .id,
      .password {
         width: 50%;
         height: 100%;
         cursor: pointer;
         font-size: var(--font-large);
         font-weight: 700;
         color: var(--third-color4);
         background-color: var(--second-color2);
         border-color: var(--third-color4);
      }
      .id {
         border-width: 0 0.3px 0.3px 0;
      }
      .password {
         border-width: 0 0 0.3px 0.3px;
      }
      .active {
         background-color: var(--second-color1);
         border: none;
      }
   }
`;
