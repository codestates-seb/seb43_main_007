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
   },
});

export const {
   setComments,
   addComment,
   updateComment,
   deleteComments,
   addReply,
} = commentsSlice.actions;

export default commentsSlice.reducer;
