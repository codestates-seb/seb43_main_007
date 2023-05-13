import styled from "styled-components";
import { useState } from "react";
import Comment from "./Comment";
import dummyComments from "./dummyComments";

function CommentList() {
   const [comments, setComments] = useState(dummyComments);
   const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
      null
   );

   const handleReplySubmit = (commentId: number, content: string) => {
      console.log("Reply content:", content);
   };

   const handleReplyClick = (commentId: number | null) => {
      setSelectedCommentId(commentId);
   };

   return (
      <CommentListContainer>
         <ul className="comments">
            {comments.map((comment) => {
               const isReplySelected = selectedCommentId === comment.commentId;

               return (
                  <Comment
                     key={comment.commentId}
                     comment={comment}
                     handleReplySubmit={(content) =>
                        handleReplySubmit(comment.commentId, content)
                     }
                     handleReplyClick={handleReplyClick}
                     isReplySelected={isReplySelected}
                  />
               );
            })}
         </ul>
      </CommentListContainer>
   );
}

export default CommentList;

export const CommentListContainer = styled.div`
   display: flex;
   flex-direction: column;

   .comments {
      padding: 0;
   }
`;
