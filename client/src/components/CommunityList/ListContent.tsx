import type { ListDataProps } from "./Listtypes";

function ListContent({ datas }: { datas: ListDataProps }) {
   return (
      <li>
         <div>{datas.title}</div>
      </li>
   );
}

export default ListContent;
