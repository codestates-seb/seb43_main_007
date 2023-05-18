import styled from "styled-components";
import { RiSeedlingLine, RiSeedlingFill } from "react-icons/ri";
import { BsPin, BsPinFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { PostTitleProps } from "./postDetailTypes";

function PostTitle({
   title,
   now,
   like,
   bookmark,
   nickName,
   userPhoto,
}: PostTitleProps) {
   const postDate = now.slice(0, 10);
   const postTime = now.slice(11, 19);

   return (
      <PostTitleContainer>
         <TopTitleContainer>
            <TitleBadgeContainer>
               {/* Editor's pick 컴포넌트 - 세영님 */}
               <h1 className="post-title">{title}</h1>
            </TitleBadgeContainer>
            <MarkContainer>
               <button type="submit" className="pick-btn">
                  채택
               </button>
               <BsPin size={23} style={{ cursor: "pointer" }} />
               <AiOutlineHeart size={23} style={{ cursor: "pointer" }} />
               <RiSeedlingLine size={23} style={{ cursor: "pointer" }} />
            </MarkContainer>
         </TopTitleContainer>
         <BottomTitleContainer>
            <AuthorDateContainer>
               <img
                  src={userPhoto}
                  className="author-img"
                  alt="author-img"
                  style={{
                     width: "20px",
                     height: "20px",
                     borderRadius: "50%",
                  }}
               />
               <span className="author-date">
                  {nickName} | {postDate} {postTime}
               </span>
            </AuthorDateContainer>
            <span className="likes-comments">좋아요 153 | 댓글 3</span>
         </BottomTitleContainer>
      </PostTitleContainer>
   );
}

export default PostTitle;

export const PostTitleContainer = styled.div`
   background-color: var(--first-color2);
   padding: 15px;
`;

export const TopTitleContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 15px;
`;

export const TitleBadgeContainer = styled.div`
   display: flex;

   .post-title {
      font-size: 18px;
      margin: 0;
   }
`;

export const MarkContainer = styled.div`
   display: flex;
   justify-content: space-between;
   width: 130px;

   .pick-btn {
      font-size: 12px;
      border: 1px solid #c4dccb;
      color: var(--first-color4);
      background-color: transparent;
      cursor: pointer;
   }
`;

export const BottomTitleContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   font-size: 12px;
`;

export const AuthorDateContainer = styled.div`
   display: flex;
   align-items: center;

   .author-date {
      margin-left: 5px;
   }
`;
