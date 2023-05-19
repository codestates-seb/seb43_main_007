import styled from "styled-components";
import IndividualIntro from "./IndividualIntro";
import { feMember, beMember } from "./memberInfo";

function Introduce() {
   return (
      <IntroduceContainer>
         <div className="intro-box">
            <span className="intro-title">Front-End</span>
            <div className="indivi-box">
               {feMember.map((member) => {
                  return <IndividualIntro key={member.name} {...member} />;
               })}
            </div>
         </div>
         <div className="intro-box">
            <span className="intro-title">Back-End</span>
            <div className="indivi-box">
               {beMember.map((member) => {
                  return <IndividualIntro key={member.name} {...member} />;
               })}
            </div>
         </div>
      </IntroduceContainer>
   );
}

export default Introduce;

const IntroduceContainer = styled.div`
   display: flex;
   width: 840px;
   .intro-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 390px;
      margin: 0 10px;
      .intro-title {
         font-size: 20px;
         text-align: center;
         margin-bottom: 10px;
      }
      .indivi-box {
         display: flex;
         justify-content: center;
      }
   }
`;
