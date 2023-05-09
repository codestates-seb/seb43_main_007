import { useState } from "react";
import styled from "styled-components";
import {
   faThumbtack,
   faHeart,
   faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiSeedlingLine, RiSeedlingFill } from "react-icons/ri";
import { BsPin, BsPinFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import type { ListDataProps } from "./listTypes";
import logo1 from "../../assets/logo1.png";

function ListContent({ datas }: { datas: ListDataProps }) {
   // 관리자(매니저)인지 (로컬에서 관리?)
   const [isManager, setIsManager] = useState(false);
   // 에디터 픽 유무(리덕스 관리?)-리덕스 툴킷으로 로컬할 수 있는거 찾아보기
   const [isEditerPick, setIsEditerPick] = useState(false);
   // 고정 유무(리덕스 툴킷으로 관리?)
   const [isFixPin, setIsFixPin] = useState(false);
   // 좋아요 유무
   const [isLike, setIsLike] = useState(false);
   // 즐겨찾기(북마크) 유무
   const [isBookMark, setIsBookMark] = useState(false);

   const pinFixClickHandler = () => {
      setIsFixPin(!isFixPin);
   };

   return (
      <Li>
         <DivContainer>
            {/* 썸네일 */}
            <div className="div-img">
               <img src={logo1} alt="로고이미지" style={{ width: "70px" }} />
            </div>
            {/* 에디터픽 + 제목 */}
            <div className="div-title">
               {isEditerPick ? (
                  <div className="editer">{`Editer's Pick`}</div>
               ) : null}
               <div>{datas.title}</div>
            </div>
            {/* 고정 */}
            <div className="div-author">
               {isManager ? (
                  isFixPin ? (
                     <DivImg>
                        <BsPinFill size="25" color="green" />
                     </DivImg>
                  ) : (
                     <DivImg>
                        <BsPin size="25" />
                     </DivImg>
                  )
               ) : isFixPin ? (
                  <DivImg onClick={pinFixClickHandler}>
                     <BsPinFill size="25" color="green" />
                  </DivImg>
               ) : (
                  <DivImg onClick={pinFixClickHandler}>
                     <BsPin size="25" />
                  </DivImg>
               )}
               <DivAuthor>
                  <span>
                     <img
                        src={logo1}
                        alt="로고이미지"
                        style={{ width: "30px" }}
                     />
                  </span>
                  <span>{datas.author}</span>
               </DivAuthor>
            </div>
            {/* 좋아요 + 북마크 */}
            <div className="div-createdAt">
               <DivImg>
                  <button type="button" onClick={() => setIsLike(!isLike)}>
                     {isLike ? (
                        <AiFillHeart size="25" color="red" />
                     ) : (
                        <AiOutlineHeart size="25" />
                     )}
                  </button>
                  <button
                     type="button"
                     onClick={() => setIsBookMark(!isBookMark)}
                  >
                     {isBookMark ? (
                        <RiSeedlingFill size="25" color="green" />
                     ) : (
                        <RiSeedlingLine size="25" />
                     )}
                  </button>
               </DivImg>
               <div>{datas.createdAt}</div>
            </div>
         </DivContainer>
      </Li>
   );
}

export default ListContent;
const Li = styled.li`
   width: 100%;
`;

const DivContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   width: 100%;

   .div-img {
      width: 30px;
   }

   .div-title {
      width: 500px;

      .editer {
         width: 90px;
         height: 20px;
         border-radius: 5px;
         background-color: #e0ede4;
         color: #083c1f;
      }
   }
   .div-author {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      height: 60px;
   }
   .div-createdAt {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      height: 60px;
   }
`;

const DivAuthor = styled.div`
   display: flex;
   align-items: center;
`;

const DivImg = styled.div`
   display: flex;
   cursor: pointer;

   > button {
      border: 0px;
      background-color: transparent;

      cursor: pointer;
   }
`;
