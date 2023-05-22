import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import PostTitle from "../components/postdetail/PostTitle";
import PostContent from "../components/postdetail/PostContent";
import PostTags from "../components/postdetail/PostTags";
import PostButtons from "../components/postdetail/PostButtons";
import CreateComment from "../components/postdetail/CreateComment";
import CommentList from "../components/postdetail/CommentList";
import PostAddress from "../components/postdetail/PostAddress";
import usePost from "../hooks/usePost";
import { RootState } from "../store/store";

function PostDetail() {
   const { boardId: boardIdString } = useParams<{ [key: string]: string }>();
   const { post, handleDeletePost } = usePost(boardIdString || "");
   const memberId = useSelector((state: RootState) => state.memberId);
   const navigate = useNavigate();

   if (memberId === 0) {
      navigate(`/login`);
   }

   if (!post) {
      return <div>Loading...</div>;
   }

   const baordIdNumber = Number(boardIdString) || 0;

   return (
      <PostDetailContainer>
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
            comments={post.comments}
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
         <CreateComment boardId={baordIdNumber} />
         <CommentList comments={post.comments} boardId={baordIdNumber} />
      </PostDetailContainer>
   );
}

export default PostDetail;

export const PostDetailContainer = styled.div`
   width: 1080px;
   padding-top: 16px;
`;
