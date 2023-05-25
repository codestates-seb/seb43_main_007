import styled from "styled-components";

function GuideLine() {
   const guidePolicy = [
      "작성 글이 여러 사람의 추천을 받아 관리자에 의해 채택되면 메인화면에 게시됩니다.",
      "채택된 게시글 작성자에게는 이메일이 발송됩니다.",
      "채택된 게시글은 수정 혹은 삭제를 할 수 없습니다.",
   ];

   const guideList = [
      "커뮤니티를 꼭 정해주세요! 그리고 제목과 주소, 이미지가 삽입되어야 글을 게시할 수 있습니다.",
      "본문은 30자 이상 작성해야 합니다.",
      "글이 채택되면 수정할 수 없습니다.",
      "욕설 및 비방글은 경고 없이 삭제 조치됩니다.",
      "태그는 10자 이하로 5개까지 작성할 수 있습니다.",
   ];

   return (
      <DivContainer>
         <OlContent className="guide-policy">
            <div className="guide">커뮤니티 정책</div>
            {guidePolicy.map((el, idx) => {
               const key = idx;
               return (
                  <li key={key} className="li-text-style">
                     <div>- {el}</div>
                  </li>
               );
            })}
         </OlContent>
         <OlContent>
            <div className="guide">글 작성시 유의사항</div>
            {guideList.map((el, idx) => {
               const key = idx;
               return (
                  <li key={key} className="li-text-style">
                     <div className="number-list">{`0${idx + 1}`}</div>
                     <div>{el}</div>
                  </li>
               );
            })}
         </OlContent>
      </DivContainer>
   );
}

export default GuideLine;

const DivContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   height: 230px;

   /* background-color: var(--second-color1); */
   border-radius: 5px;
   border: 3px solid var(--first-color4);
   padding-left: 10px;

   .guide {
      font-size: 25px;
   }

   .guide-policy {
      margin-bottom: 20px;
   }
`;

const OlContent = styled.ol`
   .li-text-style {
      display: flex;
      color: var(--first-color4);

      .number-list {
         color: #fe7450;
         width: 30px;
      }
   }
`;
