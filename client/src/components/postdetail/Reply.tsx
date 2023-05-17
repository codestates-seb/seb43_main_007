import styled from "styled-components";
import { ReplyProps } from "./postDetailTypes";

function Reply({ comment }: ReplyProps) {
   return (
      <ReplyContainer>
         <ReplyBox>
            <ReplyAuthorInfoContainer>
               <ReplyAuthorInfo>
                  <img
                     src={comment.picture}
                     alt="reply-author-img"
                     className="reply-author-img"
                  />
                  <span className="reply-author">{comment.nickname}</span>
               </ReplyAuthorInfo>
            </ReplyAuthorInfoContainer>
            <ReplyContent>
               <div className="reply-content">{comment.content}</div>
            </ReplyContent>
            <span className="reply-createdAt">{comment.createdAt}</span>
         </ReplyBox>
      </ReplyContainer>
   );
}

export default Reply;

export const ReplyContainer = styled.li`
   width: 100%;
   padding: 10px 0 10px 15px;
   border-bottom: 1px solid var(--light-gray);
`;

export const ReplyBox = styled.div`
   margin-left: 150px;
   display: flex;
   justify-content: space-between;

   .reply-createdAt {
      font-size: 12px;
   }
`;

export const ReplyAuthorInfoContainer = styled.div`
   height: 100%;
`;

export const ReplyAuthorInfo = styled.div`
   display: flex;
   align-items: center;
   width: 140px;

   .reply-author-img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
   }
   .reply-author {
      font-size: 12px;
   }
`;

export const ReplyContent = styled.div`
   width: 640px;
   height: 100%;
   margin-top: 3px;

   .reply-content {
      font-size: 13px;
   }
`;
