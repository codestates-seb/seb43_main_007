import { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import useDetectClose from "../../hooks/useDetectClose";

function CommuDropDown() {
   //    const [isActive, setIsActive] = useState(false);
   //    const [item, setItem] = useState(null);

   //    const onActiveToggle = useCallback(() => {
   //       setIsActive((prev) => !prev);
   //       console.log("된건가?");
   //    }, []);

   //    const onSelectItem = useCallback((e) => {
   //       const targetId = e.target.id;

   //       if (targetId === "item_name") {
   //          setItem(e.target.parentElement.innertText);
   //       } else if (targetId === "item") {
   //          setItem(e.target.innertText);
   //       }

   //       setIsActive((prev) => !prev);
   //    }, []);

   //    const dropdownItems = [
   //       { id: 1, name: "카페" },
   //       { id: 2, name: "식당" },
   //       { id: 3, name: "전기자동차" },
   //    ];

   //    return (
   //       <div>
   //          <button type="button" onClick={onActiveToggle}>
   //             {item ? <p>{item}</p> : <p>선택해주세요</p>}
   //          </button>
   //          {/* <ul isActive={isActive}> */}
   //          <ul>
   //             {dropdownItems.map((item) => {
   //                <li id="item" key={item.id} onClick={onSelectItem}>
   //                   <p id="item_name">{item.name}</p>;
   //                </li>;
   //             })}
   //          </ul>
   //       </div>
   //    );
   const dropDownRef = useRef(null);

   const [isActive, setIsActive] = useDetectClose(dropDownRef, false);
   const [item, setItem] = useState("");

   const onActiveToggle = useCallback(() => {
      setIsActive((prev: boolean) => !prev);
   }, []);

   const onSelectItem = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
      const target = e.target as HTMLLIElement | null;
      const targetId = target?.id;

      if (targetId === "item_name") {
         const parentInnerText = target?.parentElement?.innerText || "";
         setItem(parentInnerText);
      } else if (targetId === "item") {
         const innerText = target?.innerText ?? "";
         setItem(innerText);
      }

      setIsActive((prev: boolean) => !prev);
   }, []);

   const dropdownItems = [
      { id: 1, name: "카페" },
      { id: 2, name: "리필 스테이션" },
      { id: 3, name: "식당" },
      { id: 4, name: "식료폼" },
      { id: 5, name: "전기차" },
   ];

   return (
      <DropdownContainer>
         <DropdownBody onClick={onActiveToggle} ref={dropDownRef}>
            {item ? (
               <ItemName>{item}</ItemName>
            ) : (
               <>
                  <DropdownSelect>선택해주세요.</DropdownSelect>
                  {/* <AiOutlineDown /> */}
               </>
            )}
         </DropdownBody>
         <DropdownMenu isActive={isActive}>
            {dropdownItems.map((items) => (
               <DropdownItemContainer
                  id="item"
                  key={items.id}
                  onClick={onSelectItem}
               >
                  <ItemName id="item_name">{items.name}</ItemName>
               </DropdownItemContainer>
            ))}
         </DropdownMenu>
      </DropdownContainer>
   );
}

export default CommuDropDown;

const DropdownContainer = styled.div`
   width: 400px;

   &:hover {
      cursor: pointer;
   }
`;

const DropdownBody = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 40px;
   padding: 9px 14px;
   border: 1px solid #d2d2d2;
`;

const DropdownSelect = styled.p`
   font-weight: bold;
`;

const DropdownMenu = styled.ul<any>`
   display: ${(props) => (props.isActive ? `block` : `none`)};
   width: 400px;
   background-color: white;
   position: absolute;
   // 에디터를 가리기 위해 순서를 앞으로
   z-index: 1;
   border: 2px solid #f4acbb;
`;

const DropdownItemContainer = styled.li`
   display: flex;
   justify-content: space-between;
   align-items: center;

   padding: 9px 14px;
   border-bottom: 2px solid #d2d2d2;
   border-top: none;

   &:last-child {
      border-bottom: none;
   }
`;

const ItemName = styled.p`
   font-weight: bold;
`;
