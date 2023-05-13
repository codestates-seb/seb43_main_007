export interface PostDeleteModalProps {
   open: boolean;
   close: () => void;
}

export interface CommentProps {
   comment: {
      postId: number;
      commentId: number;
      nickname: string;
      picture: string;
      content: string;
      createdAt: string;
      responseTo: number | string;
   };
   handleReplySubmit: (content: string) => void;
   handleReplyClick: (commentId: number | null) => void;
   isReplySelected: boolean;
}

export interface CreateReplyProps {
   onSubmit: (content: string) => void;
   onCancel: () => void;
}

export interface CommentCharacterCountProps {
   maxLength: number;
}

export interface CommentCharacterCountReturn {
   value: string;
   characterCount: number;
   handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
   clearValue: () => void;
}
