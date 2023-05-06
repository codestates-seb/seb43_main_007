import { useEffect, useState } from "react";

const useDetectClose = (ref: any, initialState: any) => {
   const [isOpen, setIsOpen] = useState(initialState);

   useEffect(() => {
      const pageClickEvent = (event: any) => {
         // 영역 밖을 클릭했는지 확인하는 조건문
         if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(!isOpen);
         }
      };

      if (isOpen) {
         window.addEventListener("click", pageClickEvent);
      }

      return () => {
         window.removeEventListener("click", pageClickEvent);
      };
   }, [isOpen, ref]);

   return [isOpen, setIsOpen];
};

export default useDetectClose;
