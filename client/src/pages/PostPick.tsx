import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getPostData, updatePost, editorPick } from "../api/axios";
import GuideLine from "../components/createPost/GuideLine";
import QuillTextEditor from "../components/createPost/QuillTextEditor";
import TitleTagCommuForm from "../components/createPost/TitleTagCommuForm";
import { RootState } from "../store/store";
import { postError } from "../util/toastify";

function PostPick() {
   const { boardId: boardIdString } = useParams<{ [key: string]: string }>();
   const boardId = Number(boardIdString) || 0;
   const [item, setItem] = useState("");
   const [title, setTitle] = useState("");
   const [address, setAddress] = useState("");
   const [tagList, setTagList] = useState<{ tagName: string }[]>([]);
   const [value, setValue] = useState("");
   const [isImg, setIsImg] = useState(false);

   const navigate = useNavigate();
   const memberId = useSelector((state: RootState) => state.memberId);

   useEffect(() => {
      const fetchPost = async () => {
         const post = await getPostData(memberId, boardId);
         setItem(post.category);
         setTitle(post.title);
         setAddress(post.address);
         setTagList(post.tags);
         setValue(post.content);
         setIsImg(post.photo);
         console.log(post);
      };
      fetchPost();
   }, [boardId, memberId]);

   const previewBody = value ? value.replace(/(<([^>]+)>)/gi, "").trim() : "";

   const valid = () => {
      if (title.length === 0 || address.length === 0 || item.length === 0)
         return false;
      if (!(previewBody.length > 30)) return false;
      if (!isImg) return false;

      return true;
   };

   const updatePostButtonClick = async () => {
      const isValid = valid();
      if (isValid) {
         await updatePost(
            boardId,
            memberId,
            item,
            title,
            address,
            value,
            tagList
         );
         navigate(`/post/${boardId}`);
      } else {
         postError();
      }
   };

   const editorUpdateHandler = async () => {
      try {
         await editorPick(boardId);
         await updatePostButtonClick();
         navigate("/home");
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <DivContainer
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         exit={{ opacity: 0 }}
      >
         <div className="guide-line">
            <GuideLine />
         </div>
         <div className="section-div">
            <TitleTagCommuForm
               item={item}
               setItem={setItem}
               setTitle={setTitle}
               setAddress={setAddress}
               tagList={tagList}
               setTagList={setTagList}
               title={title}
               address={address}
            />
            <QuillTextEditor
               setValue={setValue}
               value={value}
               setIsImg={setIsImg}
            />
         </div>
         <DivButton>
            <button
               type="button"
               onClick={editorUpdateHandler}
               className="submit-button"
            >
               채택
            </button>
         </DivButton>
      </DivContainer>
   );
}

export default PostPick;

const DivContainer = styled(motion.div)`
   display: flex;
   flex-direction: column;
   margin: 16px 0px 0px 16px;
   width: 100%;
   margin-left: 316px;

   .guide-line {
      margin-bottom: 30px;
   }
`;

const DivButton = styled.div`
   margin-top: 20px;
   height: 50px;
   text-align: end;

   .submit-button {
      background-color: var(--first-color3);
      height: 100%;
      width: 100px;

      border: 0;
      border-radius: 5px;
      outline: none;
      cursor: pointer;

      :active {
         background-color: var(--first-color4);
         color: white;
      }
   }
`;
