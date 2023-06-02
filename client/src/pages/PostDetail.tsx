import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { createBrowserHistory } from "history";
import PostTitle from "../components/postdetail/PostTitle";
import PostContent from "../components/postdetail/PostContent";
import PostTags from "../components/postdetail/PostTags";
import PostButtons from "../components/postdetail/PostButtons";
import CommentList from "../components/postdetail/CommentList";
import PostAddress from "../components/postdetail/PostAddress";
import usePost from "../hooks/usePost";
import { RootState } from "../store/store";

function PostDetail() {
   const { boardId: boardIdString } = useParams<{ [key: string]: string }>();
   const { post, handleDeletePost, postDeleted } = usePost(boardIdString || "");

   // 로그인 상태가 아니면 로그인 페이지 이동
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const history = createBrowserHistory();
   const memberId = useSelector((store: RootState) => store.memberId);
   useEffect(() => {
      // 로그인 상태가 아니면(memberId가 없으면)
      if (!memberId) {
         //  로그인 페이지로 이동, 현재 페이지 url 기억
         history.replace("/communitylist");
         navigate("/login", { state: pathname });
      }
   }, [memberId, navigate, pathname, history]);

   useEffect(() => {
      if (postDeleted) {
         navigate("/communitylist");
      }
   }, [postDeleted, navigate]);

   if (!post) {
      return <div>존재하지 않는 게시글 입니다.</div>;
   }

   const baordIdNumber = Number(boardIdString) || 0;

   return (
      <PostDetailContainer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         exit={{ opacity: 0 }}
      >
         <PostTitle
            boardId={baordIdNumber}
            title={post.title}
            now={post.now}
            pick={post.pick}
            pin={post.pin}
            likeCheck={post.likeCheck}
            likeCount={post.likeCount}
            bookmark={post.bookmark}
            nickName={post.nickName}
            userPhoto={post.userPhoto}
         />
         <PostAddress address={post.address} />
         <PostContent content={post.content} />
         <PostTags tags={post.tags} />
         <PostButtons
            memberId={post.memberId}
            handleDeletePost={handleDeletePost}
            boardId={baordIdNumber}
            category={post.category}
         />
         <CommentList boardId={baordIdNumber} />
      </PostDetailContainer>
   );
}

export default PostDetail;

export const PostDetailContainer = styled(motion.div)`
   width: 1080px;
   margin-left: 300px;
   padding-top: 16px;
`;
