import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import Creatable from "react-select/creatable";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
const CodeEditor = dynamic(import("../components/codeEditor"), { ssr: false });
import { useEffect } from "react";

import MetaTags from "components/MetaTags";
import Footer from "components/Footer";

export default function Home(props) {
  const tags = props.tags;
  const { theme, setTheme } = useTheme();
  const onTagChange = async (inputValue, actionMeta) => {
    if (actionMeta.action === "create-option") {
      await supabase.from("tags").insert({
        name: inputValue[inputValue.length - 1].label,
        color: Math.floor(Math.random() * 16777215).toString(16),
      });
      console.log(inputValue);
    }
  };
  return (
    <div className="home-parent">
      <MetaTags />
      <div>
        <div className="createsnippet">
          <div>
            <h1>
              Create a <span className="blue">Snippet</span>
            </h1>
          </div>
          <form>
            <input placeholder="Title" className="title" required />
            <CodeEditor/>
            <div className="third">
              <Creatable
                isMulti
				placeholder="Tags"
                onChange={onTagChange}
                options={tags.map((tag) => {
                  return {
                    value: tag.id,
                    label: tag.name,
                  };
                })}
                className="tags"
                menuPlacement="auto"
              />
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const tags = await (await supabase.from("tags").select("*")).data;
  return {
    props: { tags },
  };
}
