import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default function Code({
  code
}: {
  code: string;
}) {
  return (
    <CodeMirror
      value={code}
      extensions={[javascript({ jsx: true })]}
      editable={false}
      theme="light"
      color="blue"
      maxHeight="23rem"
      className="max-w-lg w-full my-auto mx-auto max-w-maxcontent"
    />
  );
}
