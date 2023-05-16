import { CommentType } from "../components/postdetail/postDetailTypes";

function groupCommentsAndReplies(commentData: CommentType[]): CommentType[] {
   // map the comments into a dictionary for easy lookup
   const commentDict: { [key: number]: CommentType } = commentData.reduce<{
      [key: number]: CommentType;
   }>((dict, comment) => {
      // eslint-disable-next-line no-param-reassign
      dict[comment.commentId] = { ...comment, replies: [] };
      return dict;
   }, {});
   // commentData
   //    [
   //     { "commentId": 1, "content": "First comment", "parent": null },
   //     { "commentId": 2, "content": "Reply to first comment", "parent": { "commentId": 1 } },
   //     { "commentId": 3, "content": "Second comment", "parent": null },
   //     { "commentId": 4, "content": "Reply to second comment", "parent": { "commentId": 3 } }
   //   ]
   // commentDict
   //    {
   //     "1": { "commentId": 1, "content": "First comment", "parent": null, "replies": [] },
   //     "2": { "commentId": 2, "content": "Reply to first comment", "parent": { "commentId": 1 }, "replies": [] },
   //     "3": { "commentId": 3, "content": "Second comment", "parent": null, "replies": [] },
   //     "4": { "commentId": 4, "content": "Reply to second comment", "parent": { "commentId": 3 }, "replies": [] }
   //   }

   // 댓글 순회하며 대댓글들을 모댓글에 넣어주기
   commentData.forEach((comment) => {
      if (comment.parent) {
         const parentComment = commentDict[comment.parent.commentId];
         if (parentComment) {
            parentComment.replies!.push(comment);
         }
      }
   });
   //    {
   //     "1": {
   //       "commentId": 1,
   //       "content": "First comment",
   //       "parent": null,
   //       "replies": [
   //         { "commentId": 2, "content": "Reply to first comment", "parent": { "commentId": 1 } }
   //       ]
   //     },
   //     "2": { "commentId": 2, "content": "Reply to first comment", "parent": { "commentId": 1 }, "replies": [] },
   //     "3": {
   //       "commentId": 3,
   //       "content": "Second comment",
   //       "parent": null,
   //       "replies": [
   //         { "commentId": 4, "content": "Reply to second comment", "parent": { "commentId": 3 } }
   //       ]
   //     },
   //     "4": { "commentId": 4, "content": "Reply to second comment", "parent": { "commentId": 3 }, "replies": [] }
   //   }

   // 댓글들만 필터링
   const topLevelComments = Object.values(commentDict).filter(
      (comment) => !comment.parent
   );

   return topLevelComments;
}

export default groupCommentsAndReplies;
