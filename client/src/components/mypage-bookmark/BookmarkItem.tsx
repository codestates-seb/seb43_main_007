import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import thumbnail from "../../assets/img/logo1.png";
import background from "../../assets/img/leafmemo.png";

function BookmarkItem() {
   return (
      <BookmarkItemContainer>
         <div className="img-box">
            <img className="thumbnail" src={thumbnail} alt="thumbnail" />
         </div>
         <div className="contents-box">
            <h1 className="contents-title">제목 자리입니다.</h1>
            <p className="contents-body">
               본문입니다. 본문은 3~4줄 정도에서 자를 예정입니다. 얼마나 적어야
               3줄이 될까요.. 이거 근데 데이터 get요청을 어떤식으로 하는게
               좋을까요?
            </p>
         </div>
         <div className="item-footer">
            <span className="author">작성자</span>
            <div className="like">
               <AiFillHeart />
               <span>50</span>
            </div>
            <span>2023 04/27</span>
         </div>
      </BookmarkItemContainer>
   );
}

export default BookmarkItem;

const BookmarkItemContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 300px;
   height: 350px;
   /* background-color: beige; */
   background-image: linear-gradient(
         rgba(254, 255, 222, 0.1),
         rgba(221, 255, 188, 0.1)
      ),
      url(${background});
   background-position: 50% 30%;
   border-radius: 10px;
   box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
   .img-box {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 150px;
      border-bottom: 1px solid var(--second-color4);
      overflow: hidden;
   }

   .contents-box {
      width: 250px;
      height: 140px;
      padding: 10px;
      .contents-title {
         display: inline-block;
         font-size: var(--font-large);
         font-weight: 700;
         margin: 10px 0;
         color: black;
      }
      .contents-body {
         font-size: var(--font-base);
      }
   }
   .item-footer {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: end;
      padding-right: 15px;
      width: 100%;
      .author {
         display: inline-block;
         margin-bottom: 10px;
      }
      .like {
         position: absolute;
         left: 5%;
         bottom: 0;
      }
   }
`;
