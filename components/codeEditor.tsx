import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useTheme } from 'next-themes';

export default function CodeEditor() {
  const { theme } = useTheme();
  return (
    <CodeMirror
      value="console.log('hello world!');"
      height="200px"
      extensions={[javascript({ jsx: true })]}
      theme={theme === 'light' ? 'light' : 'dark'}
      onChange={(value, viewUpdate) => {
        console.log(viewUpdate.startState.doc.length);
        if (viewUpdate.state.doc.length > 1000) {
          viewUpdate.view.dispatch
          viewUpdate.state.doc.replace(0, viewUpdate.state.doc.length, viewUpdate.startState.doc);
        }
      }}
    />
  );
}