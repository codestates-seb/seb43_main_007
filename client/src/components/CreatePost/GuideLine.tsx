import styled from "styled-components";

function GuideLine() {
   return (
      <DivContainer>
         <div className="guide">커뮤니티 정책</div>
         <div>
            작성 글이 여러 사람의 추천을 받아 관리자에 의해 채택 되면 메인화면에
            게시됩니다.
            <br /> 채택된 글 작성자에게는 이메일이 발송됩니다.
            <br />
            <br />
         </div>
         <ol>
            글 작성시 유의사항
            <li>1. 이미지 혹은 주소가 삽입되어야 글을 게시할 수 있습니다.</li>
            <li>2. 본문은 20자 이상 작성해야 합니다.</li>
            <li>3. 글이 채택되면 수정할 수 없습니다.</li>
            <li>4. 욕설 및 비방글은 경고없이 삭제 조치됩니다.</li>
         </ol>
      </DivContainer>
   );
}

export default GuideLine;

const DivContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   background-color: yellow;
   width: 100%;
   height: 20%;

   .guide {
      font-size: 25px;
   }
`;
