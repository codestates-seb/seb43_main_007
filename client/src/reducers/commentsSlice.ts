import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentType } from "../components/postdetail/commentType";

interface CommentsState {
   comments: CommentType[];
}

const initialState: CommentsState = {
   comments: [],
};

const commentsSlice = createSlice({
   name: "comments",
   initialState,
   reducers: {
      setComments: (state, action: PayloadAction<CommentType[]>) => {
         return {
            ...state,
            comments: action.payload,
         };
      },
      addComment: (state, action: PayloadAction<CommentType>) => {
         return {
            ...state,
            comments: [...state.comments, action.payload],
         };
      },
      updateComment: (state, action: PayloadAction<CommentType>) => {
         const updatedComment = action.payload;
         return {
            ...state,
            comments: state.comments.map((comment) =>
               comment.commentId === updatedComment.commentId
                  ? { ...comment, ...updatedComment }
                  : comment
            ),
         };
      },
      deleteComments: (state, action: PayloadAction<number>) => {
         const commentId = action.payload;
         return {
            ...state,
            comments: state.comments.filter(
               (comment) => comment.commentId !== commentId
            ),
         };
      },
      addReply: (
         state,
         action: PayloadAction<{ commentId: number; reply: CommentType }>
      ) => {
         const { commentId, reply } = action.payload;
         return {
            ...state,
            comments: state.comments.map((comment) =>
               comment.commentId === commentId
                  ? {
                       ...comment,
                       replies: comment.replies
                          ? [...comment.replies, reply]
                          : [reply],
                    }
                  : comment
            ),
         };
      },
      updateReply: (
         state,
         action: PayloadAction<{ commentId: number; reply: CommentType }>
      ) => {
         const { commentId, reply } = action.payload;
         return {
            ...state,
            comments: state.comments.map((comment) =>
               comment.commentId === commentId
                  ? {
                       ...comment,
                       replies: comment.replies
                          ? comment.replies.map((r) =>
                               r.commentId === reply.commentId
                                  ? { ...r, ...reply }
                                  : r
                            )
                          : [],
                    }
                  : comment
            ),
         };
      },
      deleteReply: (
         state,
         action: PayloadAction<{ commentId: number; replyCommentId: number }>
      ) => {
         const { commentId, replyCommentId } = action.payload;
         return {
            ...state,
            comments: state.comments.map((comment) =>
               comment.commentId === commentId
                  ? {
                       ...comment,
                       replies: comment.replies
                          ? comment.replies.filter(
                               (r) => r.commentId !== replyCommentId
                            )
                          : [],
                    }
                  : comment
            ),
         };
      },
   },
});

export const {
   setComments,
   addComment,
   updateComment,
   deleteComments,
   addReply,
   updateReply,
   deleteReply,
} = commentsSlice.actions;

export default commentsSlice.reducer;
