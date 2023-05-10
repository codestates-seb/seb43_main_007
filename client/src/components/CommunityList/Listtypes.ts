export type ListDataProps = {
   id: string;
   createdAt: string;
   title: string;
   url: string;
   author: string;
   answer: {
      id: string;
      createdAt: string;
      url: string;
      author: string;
      bodyHTML: string;
      avatarUrl: string;
   } | null;
   bodyHTML?: string;
   avatarUrl?: string;
};
