import styled from "styled-components";
import { PostTagProps } from "./postDetailTypes";

function PostTags({ tags }: PostTagProps) {
   return (
      <PostTagContainer>
         {tags.map((tag) => {
            return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
         })}
      </PostTagContainer>
   );
}

export default PostTags;

export const PostTagContainer = styled.div`
   margin-left: 15px;
   margin-bottom: 15px;
   display: flex;
`;

export const Tag = styled.div`
   background-color: var(--first-color3);
   border-radius: 5px;
   font-size: 12px;
   margin-right: 5px;
   padding: 3px 10px;
`;
