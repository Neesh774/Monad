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
import { Lang, Tag } from "../lib/types";

export const langs: Lang[] = [
  {
    extension: javascript,
    file: "js",
    name: "Javascript",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    extension: () => javascript({ jsx: true }),
    file: "jsx",
    name: "React Javascript",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    extension: () => javascript({ typescript: true }),
    file: "ts",
    name: "Typescript",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    extension: () => javascript({ typescript: true, jsx: true }),
    file: "tsx",
    name: "React Typescript",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    extension: json,
    file: "json",
    name: "JSON",
  },
  {
    extension: html,
    file: "html",
    name: "HTML",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  },
  {
    extension: css,
    file: "css",
    name: "CSS",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  },
  {
    extension: python,
    file: "py",
    name: "Python",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  {
    extension: markdown,
    file: "md",
    name: "Markdown",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg'
  },
  {
    extension: xml,
    file: "xml",
    name: "XML",
  },
  {
    extension: sql,
    file: "sql",
    name: "SQL",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  },
  {
    extension: java,
    file: "java",
    name: "Java",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  },
  {
    extension: rust,
    file: "rs",
    name: "Rust",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg'
  },
  {
    extension: cpp,
    file: "cpp",
    name: "C++",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
  },
  {
    extension: php,
    file: "php",
    name: "PHP",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
  },
  {
    extension: StreamLanguage.define(go),
    file: "go",
    name: "Go",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg'
  },
  {
    extension: StreamLanguage.define(ruby),
    file: "rb",
    name: "Ruby",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain.svg'
  },
  {
    extension: StreamLanguage.define(lua),
    file: "lua",
    name: "Lua",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg'
  },
  {
    extension: StreamLanguage.define(swift),
    file: "swift",
    name: "Swift",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg'
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
  },
  {
    extension: StreamLanguage.define(stylus),
    file: "styl",
    name: "Stylus",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stylus/stylus-original.svg'
  },
  {
    extension: StreamLanguage.define(erlang),
    file: "erl",
    name: "Erlang",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/erlang/erlang-original.svg'
  },
  {
    extension: StreamLanguage.define(perl),
    file: "pl",
    name: "Perl",
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg'
  },
  {
    extension: StreamLanguage.define(pascal),
    file: "pas",
    name: "Pascal",
  },
  {
    extension: StreamLanguage.define(scheme),
    file: "scm",
    name: "Scheme",
  },
];

export const tags: Tag[] = [
  {
    name: ["React", "ReactJS", "React-JS"],
    color: 189,
  },
  {
    name: ["Redux", "ReduxJS", "Redux-JS"],
    color: 263,
  },
  {
    name: ["Radix", "RadixUI", "Radix-UI"],
    color: 286,
  },
  {
    name: ["Node", "NodeJS", "Node-JS"],
    color: 87,
  },
  {
    name: ["Mongo", "MongoDB", "Mongo-DB"],
    color: 121,
  },
  {
    name: ["Mongoose", "MongooseJS", "Mongoose-JS"],
    color: 0,
  },
  {
    name: ["GraphQL", "Graph-QL"],
    color: 320,
  },
  {
    name: "Apollo",
    color: 249,
  },
  {
    name: ["Gatsby", "GatsbyJS", "Gatsby-JS"],
    color: 270,
  },
  {
    name: ["React-Native", "React Native"],
    color: 193,
  },
  {
    name: "Webpack",
    color: 201,
  },
  {
    name: "Babel",
    color: 49,
  },
  {
    name: "NPM",
    color: 5,
  },
  {
    name: "Yarn",
    color: 199,
  },
  {
    name: "Git",
    color: 9,
  },
  {
    name: ["javascript", "js", "jsx"],
    color: 54,
  },
  {
    name: ["typescript", "ts", "tsx"],
    color: 211,
  },
  {
    name: "HTML",
    color: 12,
  },
  {
    name: "CSS",
    color: 218,
  },
  {
    name: ["Python", "Python3", "Python3.6", "Python3.7", "Python3.8", "PY"],
    color: 206,
  },
  {
    name: ["Markdown", "MD"],
    color: 21,
  },
  {
    name: "XML",
    color: 21,
  },
  {
    name: "SQL",
    color: 70,
  },
  {
    name: "Java",
    color: 359,
  },
  {
    name: "Rust",
    color: 9,
  },
  {
    name: ["C++", "cpp"],
    color: 211,
  },
  {
    name: "PHP",
    color: 236,
  },
  {
    name: "Go",
    color: 183,
  },
  {
    name: "Ruby",
    color: 7,
  },
  {
    name: "Shell",
    color: 14,
  },
  {
    name: "Lua",
    color: 240,
  },
  {
    name: "Swift",
    color: 13,
  },
  {
    name: "Tcl",
    color: 220,
  },
  {
    name: "YAML",
    color: 320,
  },
  {
    name: ["Visual Basic", "visual-basic", "vb"],
    color: 207,
  },
  {
    name: "Stylus",
    color: 207,
  },
  {
    name: "Erlang",
    color: 343,
  },
  {
    name: "Nginx",
    color: 143,
  },
  {
    name: "Perl",
    color: 202,
  },
  {
    name: "Pascal",
    color: 215,
  },
  {
    name: "LiveScript",
    color: 202,
  },
  {
    name: ["Disc", "Discord", "DiscordJS", "Discord-JS", "Discord-PY", "Eris", "DJS", "DPY"],
    color: 235
  }
];