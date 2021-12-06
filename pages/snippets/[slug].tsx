import { supabase } from "../../lib/supabaseClient";
import { langs, tags } from "../../components/langs";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useRouter } from "next/router";
import { IconButton, ExportIcon, ShareIcon, toaster } from "evergreen-ui";

interface snippet {
  title: string;
  code: string;
  tag: string[];
  votes: 0;
  lang: string;
  slug: string;
}

export default function Snippet(props) {
  const { code, created_at: created, lang, tag, title } = props.snippet;
  const { theme } = useTheme();
  const router = useRouter();

  const date = new Date(created);
  const dateString = date.toLocaleDateString();
  const langObj = langs.find(
    (l) => l.name.toLowerCase() === lang.toLowerCase()
  );
  console.log(langObj);
  const langExtension =
    typeof langObj.extension === "function"
      ? langObj.extension()
      : langObj.extension;

  const share = () => {
    // get current page url
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.href}`);
      toaster.success("Copied URL to clipboard!");
    }
  };

  return (
    <div className="snippet-page">
      <div className="header">
        <h1>{title}</h1>
        <i>Created on {dateString}</i>
      </div>
      <hr />
      <div className="content">
        <CodeMirror
          value={code}
          extensions={[langExtension]}
          editable={false}
          theme={theme === "light" ? "light" : "dark"}
          minHeight="200px"
          color="blue"
        />
        <div className="actions">
          <IconButton
            icon={ShareIcon}
            onClick={() => share()}
            appearance="minimal"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const { data } = await supabase
    .from("snippets")
    .select("*")
    .eq("slug", slug)
    .limit(1);
  const snippet: snippet = data[0];
  return {
    props: {
      snippet,
    },
  };
}

export async function getStaticPaths() {
  const { data } = await supabase.from("snippets").select("slug");
  const paths = data.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
