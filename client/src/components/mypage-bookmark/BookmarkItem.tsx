import styled from "styled-components";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router";
import background from "../../assets/img/leafmemo.png";

export interface BookmartItemType {
   boardId: number;
   title: string;
   content: string;
   address: string;
   now: string;
   photo: string;
   pin: number;
   pick: number;
   likeCheck: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   category: string;
   comments: [];
   likeCount: number;
   memberId: number;
   tags: { tagId: number; tagName: string }[];
}

function BookmarkItem({ data }: { data: BookmartItemType }) {
   const navigate = useNavigate();
   // 생성날짜 보기좋게 파싱
   const date = new Date(data.now);
   date.setHours(date.getHours() + 9);
   const parsedDate = date.toLocaleString("ko-kr");
   // 내용에서 html 태그 제외하고 글자만 빼오기
   const previewBody = data.content
      .replace(/(<([^>]+)>)/gi, "")
      .replace("&nbsp;", " ")
      .trim();
   const handleClick = () => {
      navigate(`/post/${data.boardId}`);
   };
   return (
      <BookmarkItemContainer onClick={handleClick}>
         <div className="img-box">
            <img className="thumbnail" src={data.photo} alt="thumbnail" />
         </div>
         <div className="contents-box">
            <h1 className="contents-title">{data.title}</h1>
            <p className="contents-body">{previewBody}</p>
         </div>
         <div className="item-footer">
            <ul className="tags">
               {data.tags.slice(0, 3).map((el) => {
                  // 태그 4글자까지만 보이게
                  const parsingTag = el.tagName.split("").slice(0, 4).join("");
                  return (
                     <li className="tag-item" key={el.tagId}>
                        {parsingTag}
                     </li>
                  );
               })}
               {data.tags.length > 3 ? <span className="dot">...</span> : null}
            </ul>
            <div className="user-info">
               <img className="user-photo" src={data.userPhoto} alt="user" />
               <span className="author">{data.nickName.slice(0, 6)}</span>
            </div>
            <div className="like">
               <AiFillHeart />
               <span className="like-count">{data.likeCount}</span>
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
   box-shadow: rgba(0, 0, 0, 0.25) 0px 34px 35px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
   transition-duration: 0.3s;
   cursor: pointer;
   &:hover {
      transform: translateY(-10px);
      transition-duration: 0.3s;
   }
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
      .tags {
         display: flex;
         position: absolute;
         left: 0;
         width: 60%;
         overflow: hidden;
         .tag-item {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: var(--font-small);
            padding: 2px;
            border-radius: 5px;
            min-width: 20px;
            height: 20px;
            margin-right: 5px;
            background-color: var(--second-color3);
         }
      }
      .user-info {
         display: flex;
         align-items: center;
         justify-content: end;
         margin-bottom: 10px;
         width: 50%;
         .user-photo {
            width: 20px;
            margin-right: 2px;
         }
         .author {
            display: inline-block;
         }
      }
      .like {
         position: absolute;
         display: flex;
         justify-content: center;
         align-items: center;
         left: 5%;
         bottom: 0;
         .like-count {
            margin-left: 4px;
         }
      }
   }
`;
