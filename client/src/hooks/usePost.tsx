import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { deletePost, getPostData } from "../api/axios";
import { postDeleteSuccess, serverError } from "../util/toastify";
import { CommentType } from "../components/postdetail/Comment";
import groupCommentsAndReplies from "../util/groupCommentsAndReplies";
import { RootState } from "../store/store";

export interface Post {
   memberId: number;
   boardId: number;
   title: string;
   content: string;
   address: string | null;
   now: string;
   photo: string;
   like: number;
   bookmark: number;
   nickName: string;
   userPhoto: string;
   tags: {
      tagId: number;
      tagName: string;
   }[];
   comments?: CommentType[];
}

const usePost = (boardId: string) => {
   const navigate = useNavigate();
   const [post, setPost] = useState<Post | null>(null);

   const memberId = useSelector((state: RootState) => state.memberId);

   useEffect(() => {
      const fetchPost = async () => {
         const data = await getPostData(memberId, parseInt(boardId, 10));
         if (data && data.comments) {
            data.comments = groupCommentsAndReplies(data.comments);
         }
         setPost(data);
         console.log(`data.comments :`, data.comments);
      };

      fetchPost();
   }, [memberId, boardId]);

   const handleDeletePost = async () => {
      const response = await deletePost(parseInt(boardId, 10));
      if (response) {
         console.log("게시글 삭제");
         postDeleteSuccess();
         navigate("/communitylist");
      } else {
         serverError();
      }
   };

   return { post, handleDeletePost };
};

export default usePost;
