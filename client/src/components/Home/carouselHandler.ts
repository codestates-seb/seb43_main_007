import { CarouselHandlerArgsType } from "./homeTypes";

interface PageHandler {
   (argsArr: CarouselHandlerArgsType): void;
}

export const prevHandler: PageHandler = (argsArr) => {
   const [pickNumber, setPickNumber, setCarouselTransition, setDisabled] =
      argsArr;
   const curNumber = pickNumber;
   setDisabled(true);
   if (curNumber <= 1) {
      setPickNumber(0);
      setTimeout(() => {
         setCarouselTransition("none");
      }, 500);
      setTimeout(() => {
         setPickNumber(5);
      }, 550);
      setTimeout(() => {
         setCarouselTransition("transform 0.5s ease-in-out");
      }, 600);
   } else setPickNumber(curNumber - 1);
   setTimeout(() => {
      setDisabled(false);
   }, 500);
};
export const nextHandler: PageHandler = (argsArr) => {
   const [pickNumber, setPickNumber, setCarouselTransition, setDisabled] =
      argsArr;
   const curNumber = pickNumber;
   setDisabled(true);
   if (curNumber >= 5) {
      setPickNumber(6);
      setTimeout(() => {
         setCarouselTransition("none");
      }, 500);
      setTimeout(() => {
         setPickNumber(1);
      }, 550);
      setTimeout(() => {
         setCarouselTransition("transform 0.5s ease-in-out");
      }, 600);
   } else setPickNumber(curNumber + 1);
   setTimeout(() => {
      setDisabled(false);
   }, 500);
};
