import { supabase } from "../lib/supabaseClient";
import Creatable from "react-select/creatable";
import Select from "react-select";
import CodeMirror from "@uiw/react-codemirror";
import slugify from "slugify";
import { useTheme } from "next-themes";
import { langs } from "../components/langs";
import React, { useState, useEffect } from "react";
import { Extension } from "@codemirror/state";
import MetaTags from "components/MetaTags";
import { toaster, Button } from "evergreen-ui";
export default function Home(props) {
  const maxOptions = 5;
  const tags = props.tags;
  const { theme } = useTheme();
  const [mode, setMode] = useState("javascript");
  const [code, setCode] = useState('console.log("Welcome to Monad!");');
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);
  const [extensions, setExtensions] = useState<Extension[]>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const onTagChange = async (inputValue, actionMeta) => {
    setSelectedOption(inputValue);
    if (
      actionMeta.action === "create-option" &&
      inputValue[inputValue.length - 1].label !== ""
    ) {
      await supabase.from("tags").insert({
        name: inputValue[inputValue.length - 1].label,
        color: Math.floor(Math.random() * 360),
      });
    }
  };
  function handleLangChange(lang: string) {
    if (langs[lang]) {
      setExtensions([langs[lang]()]);
    }
    setMode(lang);
  }
  useEffect(() => {
    handleLangChange("javascript");
  }, []);
  if(!tags) { return null; }

  const submitSnippet = async () => {
    setSubmitLoading(true);
    if (code.length < 10) {
      alert("Code is too short!");
      setSubmitLoading(false);
      return;
    } else if (title.length < 3) {
      alert("Title is too short! It must be over 3 characters");
      setSubmitLoading(false);
      return;
    } else if (title.length > 30) {
      alert("Title is too long! It must be under 30 characters");
      setSubmitLoading(false);
      return;
    } else if (selectedOption.length < 1) {
      alert("You must select at least one tag!");
      setSubmitLoading(false);
      return;
    } else if (code === 'console.log("Welcome to Monad!");') {
      alert("You need an actual snippet!");
      setSubmitLoading(false);
      return;
    }
    const slug = slugify(title);
    const { data } = await supabase.from("snippets").select("slug, lang");
    if (data.find((x) => x.slug === slug && x.lang === mode)) {
      alert("Please select a different title!");
      setSubmitLoading(false);
      return;
    }
    await supabase.from("snippets").insert({
      title: title,
      code: code,
      tag: selectedOption.map((tag) => tag.label),
      votes: 0,
      lang: mode,
      slug: slug,
    });
    setSubmitLoading(false);
    toaster.success("Snippet submitted!");
  };
  return ( 
    <div className="home-parent">
      <MetaTags />
      <div>
        <div className="createsnippet">
          <div className="header">
            <h1>
              Create a <span className="blue">Snippet</span>
            </h1>
          </div>
          <form>
            <input
              placeholder="Title"
              className="snippet-title"
              required
              onChange={(v) => {
                setTitle(v.target.value);
              }}
            />
            <CodeMirror
              value={code}
              height="200px"
              className="snippet-code"
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
                } else {
                  setCode(value);
                }
              }}
            />
            <div className="third">
              <Creatable
                isMulti
                placeholder="Tags"
                onChange={onTagChange}
                closeMenuOnSelect={false}
                noOptionsMessage={() => {
                  return selectedOption.length === maxOptions
                    ? "You have reached the maximum tag limit"
                    : "No options available";
                }}
                options={
                  selectedOption.length === maxOptions
                    ? []
                    : tags.map((tag) => {
                        return {
                          value: tag.id,
                          label: tag.name,
                          color: tag.color,
                        };
                      })
                }
                className="tags"
                menuPlacement="auto"
                isValidNewOption={(inputValue) => {
                  if (
                    inputValue.length > 15 ||
                    inputValue.length < 1 ||
                    selectedOption.length === maxOptions
                  ) {
                    return false;
                  }
                  return true;
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "var(--darkBlue)",
                    neutral0: "var(--foreground)",
                    neutral70: "var(--text-primary)"
                  },
                })}
                styles={{
                  container: (base) => {
                    return {
                      ...base,
                      minWidth: "150px",
                    };
                  },
                  control: (base) => {
                    return {
                      ...base,
                      backgroundColor: theme === 'light' ? 'var(--background)' : 'var(--foreground)',
                    }
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
                      color: `hsl(${data.color}, 100%, 20%)`,
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0",
                    };
                  },
                  multiValueRemove: (base, { data }) => {
                    return {
                      ...base,
                      backgroundColor: `hsl(${data.color}, 100%, 81%)`,
                      color: `hsl(${data.color}, 100%, 30%)`,
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                      ":hover": {
                        backgroundColor: `hsl(${data.color}, 100%, ${theme === 'dark' ? '60' : '40'}%)`,
                        color: "white",
                      },
                    };
                  },
                  option: (base, { data }) => {
                    return {
                      ...base,
                      color: `hsl(${data.color}, 100%, ${theme === 'dark' ? '50' : '30'}%)`,
                      ":hover": {
                        backgroundColor: `hsla(${data.color}, 50%, 80%, ${theme === 'dark' ? '0.35' : '0.6'})`,
                      },
                    };
                  },
                }}
              />
              <Select
                placeholder="Language"
                className="lang-select"
                onChange={(option) => {
                  handleLangChange(option.value);
                }}
                options={Object.keys(langs).map((lang) => ({
                  value: lang,
                  label: lang,
                }))}
                styles={{
                  container: (base) => {
                    return {
                      ...base,
                      minWidth: "130px",
                      height: "40px",
                    };
                  },
                  control: (base) => {
                    return {
                      ...base,
                      backgroundColor: theme === 'light' ? 'var(--background)' : 'var(--foreground)',
                    }
                  },
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "var(--darkBlue)",
                    neutral0: "var(--foreground)",
                    primary25: "var(--hover)",
                    neutral70: "var(--text-primary)",
                    neutral80: "var(--text-primary)"
                  },
                })}
              />
              <Button className="submit-snippet" onClick={submitSnippet} isLoading={submitLoading} height='40px'>
                {submitLoading? "Posting..." : "Post"}
              </Button>
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
