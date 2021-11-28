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
        if (viewUpdate.state.doc.length > 1000) {
          const changes = viewUpdate.changes;
          const antichanges = changes.invert(viewUpdate.state.doc);
          const transaction = viewUpdate.state.update({
            changes: antichanges
          });
          viewUpdate.view.dispatch(transaction);
        }
      }}
    />
  );
}