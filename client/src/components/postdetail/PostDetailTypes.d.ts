export interface PostDeleteModalProps {
   open: boolean;
   close: () => void;
}

interface CommentProps {
   comment: {
      postId: number;
      commentId: number;
      nickname: string;
      picture: string;
      content: string;
      createdAt: string;
      responseTo: number | string;
   };
}

interface ReplyFormProps {
   onSubmit: (content: string) => void;
}

interface CommentCharacterCountProps {
   maxLength: number;
}

interface CommentCharacterCountReturn {
   value: string;
   characterCount: number;
   handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
