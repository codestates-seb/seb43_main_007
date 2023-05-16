import styled from "styled-components";
import icon1 from "../../assets/img/icon1.png";
import icon2 from "../../assets/img/icon2.png";
import icon3 from "../../assets/img/icon3.png";
import icon4 from "../../assets/img/icon4.png";
import icon5 from "../../assets/img/icon5.png";
import icon6 from "../../assets/img/icon6.png";
import IndividualIntro from "./IndividualIntro";

function Introduce() {
   return (
      <IntroduceContainer>
         <div className="intro-box">
            <span className="intro-title">Front-End</span>
            <div className="indivi-box">
               <IndividualIntro name="주효진(팀장)" img={icon1} />
               <IndividualIntro name="이세영" img={icon2} />
               <IndividualIntro name="김수현" img={icon3} />
            </div>
         </div>
         <div className="intro-box">
            <span className="intro-title">Back-End</span>
            <div className="indivi-box">
               <IndividualIntro name="천찬웅(팀장)" img={icon4} />
               <IndividualIntro name="이인건" img={icon5} />
               <IndividualIntro name="김윤지" img={icon6} />
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
