import { CommentType } from "../components/postdetail/Comment";

function groupCommentsAndReplies(commentData: CommentType[]): CommentType[] {
   const commentDict: {
      [key: number]: CommentType & { replies: CommentType[] };
   } = commentData.reduce<{
      [key: number]: CommentType & { replies: CommentType[] };
   }>((dict, comment) => {
      // eslint-disable-next-line no-param-reassign
      dict[comment.commentId] = { ...comment, replies: [] };
      return dict;
   }, {});

   commentData.forEach((comment) => {
      if (comment.parentId !== 0) {
         const parentComment = commentDict[comment.parentId];
         if (parentComment) {
            parentComment.replies.push(comment);
         }
      }
   });

   const topLevelComments = Object.values(commentDict).filter(
      (comment) => comment.parentId === 0
   );

   console.log(commentData);

   return topLevelComments;
}

export default groupCommentsAndReplies;
