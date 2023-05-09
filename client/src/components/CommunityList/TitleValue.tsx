type TitleValueProps = {
   value: string;
   setIsOpen: (isOpen: boolean) => void;
   setTitle: (setTitle: string) => void;
   isOpen: boolean;
};

export default function TitleValue({
   value,
   setIsOpen,
   setTitle,
   isOpen,
}: TitleValueProps) {
   const ValueClick = () => {
      setTitle(value);
      setIsOpen(!isOpen);
   };

   return (
      <li>
         <button type="button" onClick={ValueClick}>
            {value}
         </button>
      </li>
   );
}

// 1. 타입 설정 문제
// 2. li안에 클릭을 하면 웹접근성 문제
// 3. input으로 만드는게 맞는가?
