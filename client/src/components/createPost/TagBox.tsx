import { useState } from "react";
import styled from "styled-components";

type TagProps = {
   tagList: { tagName: string }[];
   setTagList: React.Dispatch<
      React.SetStateAction<
         {
            tagName: string;
         }[]
      >
   >;
};

function TagBox({ tagList, setTagList }: TagProps) {
   // 태그값 저장하는 상태변수(각각)
   const [tagItem, setTagItem] = useState<string>("");

   // 빈배열이면 안되고 엔터를 쳐야만 submitTagItem 함수 실행
   const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.currentTarget.value.length !== 0 && e.key === "Enter") {
         submitTagItem();
      }
   };

   // 태그를 태그 리스트에 저장하는 함수
   const submitTagItem = () => {
      const updatedTagList = [...tagList];
      updatedTagList.push({ tagName: tagItem });
      setTagList(updatedTagList);
      setTagItem("");
   };

   // 태그를 버튼클릭으로 지우는 함수
   const deleteTagItem = (e: any) => {
      const deleteTag = e.target.parentElement.firstChild.innerText;
      const filteredTagList = tagList.filter(
         (item) => item.tagName !== deleteTag
      );
      setTagList(filteredTagList);
   };

   return (
      <TagContainer>
         <div className="tag-div">태그</div>
         {/* 추가한 태그 리스트를 매핑하는 코드 */}
         {tagList.map((item, index) => {
            return (
               <TagItem key={index}>
                  <span>{item.tagName}</span>
                  <button type="button" onClick={deleteTagItem}>
                     X
                  </button>
               </TagItem>
            );
         })}
         <TagInput
            type="text"
            placeholder="태그를 입력하세요."
            tabIndex={2}
            onChange={(e) => setTagItem(e.target.value)}
            value={tagItem}
            onKeyPress={onKeyPress}
         />
      </TagContainer>
   );
}

export default TagBox;

const TagContainer = styled.div`
   display: flex;
   align-items: center;
   height: 40px;
   width: 100%;
   font-size: var(--font-base);
   border: 1px solid #d2d2d2;

   .tag-div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 40px;
      border-right: 1px solid #d2d2d2;
   }
`;

const TagInput = styled.input`
   background: transparent;
   border: none;
   outline: none;
   cursor: text;

   width: 130px;
   height: 40px;
   padding: 9px 14px;
`;

const TagItem = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin: 5px;
   padding: 5px;
   border-radius: 5px;
   font-size: 13px;
`;
