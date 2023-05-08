type PaginationProps = {
   limit: number;
   totalPosts: number;
   page: number;
   setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ limit, totalPosts, page, setPage }: PaginationProps) {
   const numPages = Math.ceil(totalPosts / limit);

   return (
      <div>
         <div>
            {Array(numPages).map((_, i) => {
               return (
                  <button
                     type="button"
                     key={i + 1}
                     onClick={() => setPage(i + 1)}
                  >
                     {i + 1}
                  </button>
               );
            })}
         </div>
      </div>
   );
}

export default Pagination;
