// toast 에디터
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

function TextEditor() {
   return (
      <div>
         <div>
            <Editor
               placeholder="내용을 입력해주세요."
               previewStyle="vertical"
               height="600px"
               initialEditType="markdown"
               useCommandShortcut
            />
         </div>
      </div>
   );
}

export default TextEditor;
