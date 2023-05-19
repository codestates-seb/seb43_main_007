import styled from "styled-components";
import { useState } from "react";
import Comment from "./Comment";
import dummyComments from "./dummyCommentData";
import groupCommentsAndReplies from "../../util/groupCommentsAndReplies";

function CommentList() {
   const [comments, setComments] = useState(
      groupCommentsAndReplies(dummyComments)
   );
   setComments(groupCommentsAndReplies(dummyComments));
   const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
      null
   );

   const handleReplySubmit = (commentId: number, content: string) => {
      console.log("handleReplySubmit called with:", { commentId, content });
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
                     handleReplySubmit={() =>
                        handleReplySubmit(comment.commentId, comment.content)
                     }
                     handleReplyClick={handleReplyClick}
                     isReplySelected={isReplySelected}
                     // selectedCommentId={selectedCommentId}
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
