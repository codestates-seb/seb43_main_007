import styled from "styled-components";

function EditerPick() {
   return (
      <EditerPickContainer>
         <div className="icon">{"<"}</div>
         <div className="contents-box">contentsBox</div>
         <div className="icon">{">"}</div>
      </EditerPickContainer>
   );
}

export default EditerPick;

const EditerPickContainer = styled.div`
   display: flex;
   justify-content: center;
   width: 900px;
   height: 750px;
   background-color: beige;
   margin-top: 20px;
   .contents-box {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 50px;
      width: 700px;
      height: 100%;
      background-color: #d5d587;
      margin: 0 10px;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
         rgba(0, 0, 0, 0.22) 0px 15px 12px;
   }
   .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100%;
      font-size: 100px;
   }
`;
