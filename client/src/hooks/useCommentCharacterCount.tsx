import { useState, ChangeEvent } from "react";
import {
   CommentCharacterCountProps,
   CommentCharacterCountReturn,
} from "../components/postdetail/postDetailTypes";

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
