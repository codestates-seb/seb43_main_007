import styled from "styled-components";
import { useState, useEffect } from "react";
import { FiSmile, FiMeh, FiFrown } from "react-icons/fi";
import { dustGet } from "../../api/axios";

function AirPollution() {
   const [dust, setDust] = useState("");

   const getDustIcon = (dustCondition: string): React.ReactNode => {
      switch (dustCondition) {
         case "좋음":
            return <FiSmile />;
         case "보통":
            return <FiMeh />;
         case "나쁨":
            return <FiFrown />;
         default:
            return null;
      }
   };

   const getColorClass = (dustCondition: string): string => {
      switch (dustCondition) {
         case "좋음":
            return "blue";
         case "보통":
            return "green";
         case "나쁨":
            return "red";
         default:
            return "";
      }
   };

   useEffect(() => {
      dustGet().then((res) =>
         setDust(res.data.response.body.items[0].informGrade.slice(5, 7))
      );
   }, []);

   return (
      <AirPollutionContainer>
         <div className="icon">{dust && getDustIcon(dust)}</div>
         <span className="today-air">오늘 서울은 미세먼지</span>
         <span className={getColorClass(dust)}>{dust}</span>
      </AirPollutionContainer>
   );
}

export default AirPollution;

export const AirPollutionContainer = styled.div`
   display: flex;
   font-size: 13px;
   margin-bottom: 10px;

   .icon {
      margin-right: 10px;
   }

   .today-air {
      margin-right: 3px;
   }

   .blue {
      color: #002afe;
   }

   .green {
      color: green;
   }

   .red {
      color: #9a2626;
   }
`;
