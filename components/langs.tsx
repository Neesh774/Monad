import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { markdown } from "@codemirror/lang-markdown";
import { xml } from "@codemirror/lang-xml";
import { sql, MySQL, PostgreSQL } from "@codemirror/lang-sql";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { StreamLanguage } from "@codemirror/stream-parser";
import { go } from "@codemirror/legacy-modes/mode/go";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { tcl } from "@codemirror/legacy-modes/mode/tcl";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import { vb } from "@codemirror/legacy-modes/mode/vb";
import { stylus } from "@codemirror/legacy-modes/mode/stylus";
import { erlang } from "@codemirror/legacy-modes/mode/erlang";
import { nginx } from "@codemirror/legacy-modes/mode/nginx";
import { perl } from "@codemirror/legacy-modes/mode/perl";
import { pascal } from "@codemirror/legacy-modes/mode/pascal";
import { liveScript } from "@codemirror/legacy-modes/mode/livescript";
import { scheme } from "@codemirror/legacy-modes/mode/scheme";
interface lang {
  extension: any;
  file: string;
  name: string;
  color?: number;
}

export const langs: lang[] = [
  {
    extension: javascript,
    file: "js",
    name: "Javascript",
    color: 54,
  },
  {
    extension: () => javascript({ jsx: true }),
    file: "jsx",
    name: "React Javascript",
    color: 54,
  },
  {
    extension: () => javascript({ typescript: true }),
    file: "ts",
    name: "Typescript",
    color: 54,
  },
  {
    extension: () => javascript({ typescript: true, jsx: true }),
    file: "tsx",
    name: "React Typescript",
    color: 54,
  },
  {
    extension: json,
    file: "json",
    name: "JSON",
    color: 256,
  },
  {
    extension: html,
    file: "html",
    name: "HTML",
    color: 12,
  },
  {
    extension: css,
    file: "css",
    name: "CSS",
    color: 218,
  },
  {
    extension: python,
    file: "py",
    name: "Python",
    color: 206,
  },
  {
    extension: markdown,
    file: "md",
    name: "Markdown",
  },
  {
    extension: xml,
    file: "xml",
    name: "XML",
    color: 21,
  },
  {
    extension: sql,
    file: "sql",
    name: "SQL",
    color: 70,
  },
  {
    extension: java,
    file: "java",
    name: "Java",
    color: 359,
  },
  {
    extension: rust,
    file: "rs",
    name: "Rust",
    color: 9,
  },
  {
    extension: cpp,
    file: "cpp",
    name: "C++",
    color: 211,
  },
  {
    extension: php,
    file: "php",
    name: "PHP",
    color: 236,
  },
  {
    extension: StreamLanguage.define(go),
    file: "go",
    name: "Go",
    color: 183
  },
  {
    extension: StreamLanguage.define(ruby),
    file: "rb",
    name: "Ruby",
    color: 7
  },
  {
    extension: StreamLanguage.define(shell),
    file: "sh",
    name: "Shell",
  },
  {
    extension: StreamLanguage.define(lua),
    file: "lua",
    name: "Lua",
    color: 240,
  },
  {
    extension: StreamLanguage.define(swift),
    file: "swift",
    name: "Swift",
    color: 13
  },
  {
    extension: StreamLanguage.define(tcl),
    file: "tcl",
    name: "Tcl",
    color: 220
  },
  {
    extension: StreamLanguage.define(yaml),
    file: "yaml",
    name: "YAML",
  },
  {
    extension: StreamLanguage.define(vb),
    file: "vb",
    name: "Visual Basic",
    color: 207
  },
  {
    extension: StreamLanguage.define(stylus),
    file: "styl",
    name: "Stylus",
  },
  {
    extension: StreamLanguage.define(erlang),
    file: "erl",
    name: "Erlang",
    color: 343
  },
  {
    extension: StreamLanguage.define(nginx),
    file: "nginx",
    name: "Nginx",
    color: 143
  },
  {
    extension: StreamLanguage.define(perl),
    file: "pl",
    name: "Perl",
    color: 202
  },
  {
    extension: StreamLanguage.define(pascal),
    file: "pas",
    name: "Pascal",
    color: 215
  },
  {
    extension: StreamLanguage.define(liveScript),
    file: "ls",
    name: "LiveScript",
    color: 202
  },
  {
    extension: StreamLanguage.define(scheme),
    file: "scm",
    name: "Scheme",
    color: 240
  },
];
