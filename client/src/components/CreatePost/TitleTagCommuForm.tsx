import styled from "styled-components";
import CommuDropDown from "./CommuDropDown";

type CommuProps = {
   setTitle: (a: string) => void;
   setAddress: (a: string) => void;
};

function TitleTagCommuForm({ setTitle, setAddress }: CommuProps) {
   // 제목입력 값 핸들러
   const titleValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
   };
   // 주소 입력 값 핸들러
   const addressValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
   };

   return (
      <div>
         <DivContent>
            <div className="community">커뮤니티</div>
            <CommuDropDown />
         </DivContent>
         <DivContent>
            <div className="title-div">제목</div>
            <input
               className="title-input"
               type="text"
               onChange={titleValueHandler}
               placeholder="제목을 입력하세요."
            />
         </DivContent>
         <DivContent>
            <div className="address-div">주소</div>
            <input
               className="address-input"
               type="text"
               onChange={addressValueHandler}
               placeholder="주소를 입력하세요."
            />
         </DivContent>
      </div>
   );
}

export default TitleTagCommuForm;

const DivContent = styled.div`
   display: flex;
   align-items: center;
   height: 40px;
   font-size: var(--font-base);

   .title-div,
   .address-div,
   .community {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 40px;
      border: 1px solid #d2d2d2;
   }
   .title-input,
   .address-input {
      width: 600px;
      height: 40px;
      padding: 9px 14px;
      border: 1px solid #d2d2d2;
   }
`;
