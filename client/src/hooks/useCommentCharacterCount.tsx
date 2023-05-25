import { useState, ChangeEvent } from "react";

export interface CommentCharacterCountProps {
   maxLength: number;
}

export interface CommentCharacterCountReturn {
   value: string;
   characterCount: number;
   handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
   clearValue: () => void;
}

const useCommentCharacterCount = ({
   maxLength,
}: CommentCharacterCountProps): CommentCharacterCountReturn => {
   const [value, setValue] = useState("");
   const characterCount = value.length;

   const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.target.value.slice(0, maxLength);
      setValue(inputValue);
   };

   const clearValue = () => {
      setValue("");
   };

   return { value, characterCount, handleChange, clearValue };
};

export default useCommentCharacterCount;
