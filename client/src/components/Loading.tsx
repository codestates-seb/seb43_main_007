import styled from "styled-components";
import loadingImg from "../assets/img/loading.gif";

function Loading() {
   return (
      <LoadingContainer>
         <span className="loading-text">Now Loading...</span>
         <img src={loadingImg} alt="loading-img" className="loading-img" />
      </LoadingContainer>
   );
}

export default Loading;

const LoadingContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100%;
   .loading-text {
      font-size: 25px;
      color: var(--third-color2);
   }
   .loading-img {
      width: 30%;
   }
`;
