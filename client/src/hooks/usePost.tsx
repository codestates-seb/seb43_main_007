import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostData } from "../api/axios";
import { postDeleteSuccess, serverError } from "../util/toastify";
import { CommentType } from "../components/postdetail/commentType";
import groupCommentsAndReplies from "../util/groupCommentsAndReplies";
import { RootState } from "../store/store";
import { setComments } from "../reducers/commentsSlice";

export interface Post {
   memberId: number;
   boardId: number;
   title: string;
   content: string;
   address: string | null;
   now: string;
   photo: string;
   pick: number;
   pin: number;
   likeCheck: number;
   likeCount: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   category: string;
   tags: {
      tagId: number;
      tagName: string;
   }[];
   comments?: CommentType[];
}

const usePost = (boardId: string) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [post, setPost] = useState<Post | null>(null);
   const [postDeleted, setPostDeleted] = useState(false);

   const memberId = useSelector((state: RootState) => state.memberId);

   useEffect(() => {
      const fetchPost = async () => {
         const data = await getPostData(memberId, parseInt(boardId, 10));
         if (data && data.comments) {
            const commentsWithReplies = groupCommentsAndReplies(data.comments);
            dispatch(setComments(commentsWithReplies));
         } else if (!data) {
            setPostDeleted(true);
         }
         setPost(data);
      };

      fetchPost();
   }, [dispatch, memberId, boardId]);

   const handleDeletePost = async () => {
      const response = await deletePost(parseInt(boardId, 10));
      if (response) {
         console.log("게시글 삭제");
         postDeleteSuccess();
         setPostDeleted(true);
         navigate("/communitylist");
      } else {
         serverError();
      }
   };

   return { post, handleDeletePost, postDeleted };
};

export default usePost;
