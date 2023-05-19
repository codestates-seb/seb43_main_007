import styled from "styled-components";
import { MemberInfoType } from "./memberInfo";

function IndividualIntro({ name, img, githubUrl }: MemberInfoType) {
   return (
      <IndividualIntroContainer href={githubUrl} target="_blank">
         <span className="member-name">{name}</span>
         <img className="member-icon" src={img} alt="icon" />
      </IndividualIntroContainer>
   );
}

export default IndividualIntro;

const IndividualIntroContainer = styled.a`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   width: 120px;
   text-decoration: none;
   color: var(--third-color4);
   .member-name {
      font-size: var(--font-large);
   }
   .member-icon {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      margin-top: 5px;
   }
`;
