import React, { Component, useState } from "react";

// You can choose to use the component or the hook
import { ReactCodeJar, useCodeJar } from "react-codejar";

const highlight = (editor) => {
  let code = editor.textContent;
  code = code.replace(/\((\w+?)(\b)/g, '(<font color="#8a2be2">$1</font>$2');
  editor.innerHTML = code;
};

const ComponentExample = () => {
  const [code, setCode] = useState('(format t "lisp example")');

  return (
    <ReactCodeJar
      code={code} // Initial code value
      onUpdate={setCode} // Update the text
      highlight={highlight} // Highlight function, receive the editor
      lineNumbers={true} // Show line numbers
    />
  );
};

const HookExample = () => {
  const [code, setCode] = useState('(format t "lisp example")');

  const editorRef = useCodeJar({
    code, // Initial code value
    onUpdate: setCode, // Update the text
    highlight, // Highlight function, receive the editor
    lineNumbers: true, // Show line numbers
  });

  return <div ref={editorRef}></div>;
};
