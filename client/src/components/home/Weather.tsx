import { useEffect, useState } from "react";
import styled from "styled-components";
import { dustGet } from "../../api/axios";
import smile from "../../assets/img/smile.png";
import neutral from "../../assets/img/neutral.png";
import sad from "../../assets/img/sad.png";

function Weather() {
   const [dust, setDust] = useState("");

   const getDustIcon = (dustCondition: string): string => {
      switch (dustCondition) {
         case "좋음":
            return smile;
         case "보통":
            return neutral;
         case "나쁨":
            return sad;
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
      <WeatherContainer>
         <div className="icon">
            {dust && (
               <img
                  src={getDustIcon(dust)}
                  alt="dust icon"
                  className="air-status-emoji"
               />
            )}
         </div>
         <div className="contents">
            <span className="region">서울</span>
            <span className="dust">
               미세먼지 : <span className="dust-condition">{dust}</span>
            </span>
         </div>
      </WeatherContainer>
   );
}

export default Weather;

const WeatherContainer = styled.div`
   display: flex;
   position: absolute;
   right: 5px;
   width: 200px;
   height: 70px;
   border-radius: 5px;
   background-color: skyblue;

   .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      border-radius: 5px 0 0 5px;
      background-color: antiquewhite;

      .air-status-emoji {
         width: 50px;
         height: 50px;
      }
   }
   .contents {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      padding-left: 3px;
      span {
         font-weight: 900;
         margin-bottom: 5px;
      }
   }
   .region {
      font-size: 20px;
   }
   .dust {
      color: gray;
   }
   .dust-condition {
      color: green;
   }
`;
