import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import thumbnail from "../../assets/img/logo1.png";
import background from "../../assets/img/leafmemo.png";
import { DummyType } from "./dummyBookmark";

function BookmarkItem({ data }: { data: DummyType }) {
   const parsedDate = new Date(data.createdAt).toLocaleString("ko-kr");
   const previewBody = data.content.replace(/(<([^>]+)>)/gi, "").trim();
   return (
      <BookmarkItemContainer>
         <div className="img-box">
            <img className="thumbnail" src={thumbnail} alt="thumbnail" />
         </div>
         <div className="contents-box">
            <h1 className="contents-title">{data.title}</h1>
            <p className="contents-body">{previewBody}</p>
         </div>
         <div className="item-footer">
            <span className="author">{data.author}</span>
            <div className="like">
               <AiFillHeart />
               <span>{data.like}</span>
            </div>
            <span>{parsedDate}</span>
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
   margin: 15px;
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
         display: -webkit-box;
         -webkit-box-orient: vertical;
         -webkit-line-clamp: 4;
         overflow: hidden;
         word-break: break-all;
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
