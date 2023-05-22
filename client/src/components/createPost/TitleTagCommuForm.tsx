import styled from "styled-components";
import CommuDropDown from "./CommuDropDown";
import TagBox from "./TagBox";

type CommuProps = {
   item: string;
   setItem: (a: string) => void;
   setTitle: (a: string) => void;
   setAddress: (a: string) => void;
   tagList: { tagName: string }[];
   setTagList: React.Dispatch<
      React.SetStateAction<
         {
            tagName: string;
         }[]
      >
   >;
   title: string;
   address: string;
};

function TitleTagCommuForm({
   item,
   setItem,
   setTitle,
   setAddress,
   tagList,
   setTagList,
   title,
   address,
}: CommuProps) {
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
         <DivContentCommu>
            <div className="community">커뮤니티</div>
            <CommuDropDown item={item} setItem={setItem} />
         </DivContentCommu>
         <DivContent>
            <div className="title-div title-red">제목</div>
            <input
               className="title-input"
               type="text"
               onChange={titleValueHandler}
               placeholder="제목을 입력하세요."
               value={title}
            />
         </DivContent>
         <DivContent>
            <div className="address-div address-red">주소</div>
            <input
               className="address-input"
               type="text"
               onChange={addressValueHandler}
               placeholder="주소를 입력하세요."
               value={address}
            />
         </DivContent>
         <TagBox tagList={tagList} setTagList={setTagList} />
      </div>
   );
}

export default TitleTagCommuForm;

const DivContentCommu = styled.div`
   display: flex;
   align-items: center;
   height: 40px;
   width: 500px;
   font-size: var(--font-base);
   border: 1px solid #d2d2d2;

   .community {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 40px;
      border-right: 1px solid #d2d2d2;
   }
`;

const DivContent = styled.div`
   display: flex;
   align-items: center;
   height: 40px;
   font-size: var(--font-base);
   border: 1px solid #d2d2d2;

   .title-div,
   .address-div,
   .community {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 40px;
      border-right: 1px solid #d2d2d2;
   }
   .title-input,
   .address-input {
      background: transparent;
      border: none;
      outline: none;
      cursor: text;

      width: 600px;
      height: 40px;
      padding: 9px 14px;
   }
`;
