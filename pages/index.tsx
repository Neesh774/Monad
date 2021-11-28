import { supabase } from "../lib/supabaseClient";
import Creatable from "react-select/creatable";
import Select from "react-select";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

import { useTheme } from "next-themes";
import { langs } from "../components/langs";
import React, { useState, useEffect } from "react";
import { Extension } from "@codemirror/state";
import MetaTags from "components/MetaTags";

export default function Home(props) {
  const tags = props.tags;
  const { theme, setTheme } = useTheme();
  const [mode, setMode] = useState("javascript");
  const [extensions, setExtensions] = useState<Extension[]>();
  const onTagChange = async (inputValue, actionMeta) => {
    if (
      actionMeta.action === "create-option" &&
      inputValue[inputValue.length - 1].label !== ""
    ) {
      await supabase.from("tags").insert({
        name: inputValue[inputValue.length - 1].label,
        color: Math.floor(Math.random() * 360),
      });
      console.log(inputValue);
    }
  };
  function handleLangChange(lang: string) {
	if (langs[lang]) {
		setExtensions([langs[lang]()]);
	  }
	setMode(lang);
  }
  useEffect(() => {
    handleLangChange('javascript');
  }, []);
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
            <CodeMirror
              value="console.log('Hello world!');"
              height="200px"
              extensions={extensions}
              theme={theme === "light" ? "light" : "dark"}
              onChange={(value, viewUpdate) => {
                if (viewUpdate.state.doc.length > 1000) {
                  const changes = viewUpdate.changes;
                  const antichanges = changes.invert(viewUpdate.state.doc);
                  const transaction = viewUpdate.state.update({
                    changes: antichanges,
                  });
                  viewUpdate.view.dispatch(transaction);
                }
              }}
            />
            <div className="third">
              <Creatable
                isMulti
                placeholder="Tags"
                onChange={onTagChange}
                closeMenuOnSelect={false}
                options={tags.map((tag) => {
                  return {
                    value: tag.id,
                    label: tag.name,
                    color: tag.color,
                  };
                })}
                className="tags"
                menuPlacement="auto"
                isValidNewOption={(inputValue) => {
                  if (inputValue.length > 15 || inputValue.length < 1) {
                    return false;
                  }
                  return true;
                }}
                styles={{
                  container: (base) => {
                    return {
                      ...base,
                      minWidth: "200px",
                    };
                  },
                  multiValue: (base, { data }) => {
                    return {
                      ...base,
                      backgroundColor: `hsl(${data.color}, 100%, 50%)`,
                    };
                  },
                  multiValueLabel: (base, { data }) => {
                    return {
                      ...base,
                      backgroundColor: `hsl(${data.color}, 100%, 81%)`,
                      color: `hsl(${data.color}, 100%, 30%)`,
                    };
                  },
                  multiValueRemove: (base, { data }) => {
                    return {
                      ...base,
                      backgroundColor: `hsl(${data.color}, 100%, 81%)`,
                      color: `hsl(${data.color}, 100%, 30%)`,
                      ":hover": {
                        backgroundColor: `hsl(${data.color}, 100%, 40%)`,
                        color: "white",
                      },
                    };
                  },
                  option: (base, { data }) => {
                    return {
                      ...base,
                      color: `hsl(${data.color}, 100%, 30%)`,
                      ":hover": {
                        backgroundColor: `hsl(${data.color}, 50%, 80%)`,
                      },
                    };
                  },
                }}
              />
              <Select
                isSearchable={false}
                placeholder="Language"
				onChange={(option) => {handleLangChange(option.value)}}
                options={Object.keys(langs).map((lang) => ({
                  value: lang,
                  label: lang,
                }))}
                styles={{
                  container: (base) => {
                    return {
                      ...base,
                      marginLeft: "1.5rem",
                      minWidth: "130px",
					  height: "40px",
                    };
                  },
                }}
              />
              <div>
                <button className="submit" type="submit">
                  Submit
                </button>
              </div>
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
