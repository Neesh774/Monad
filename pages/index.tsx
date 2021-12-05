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
import { toaster, Button, TagInput, SelectMenu, CodeIcon } from "evergreen-ui";

const maxOptions = 5;
interface snippet {
  title: string;
  code: string;
  tags: string[];
  votes: 0;
  lang: string;
  slug: string;
}
interface lang {
  extension: any;
  file: string;
  name: string;
  color?: number;
}

function findDuplicates(arr: string[]) {
  return new Set(arr).size !== arr.length;
}

export default function Home(props) {
  const { theme } = useTheme();
  const tags = props.tags;
  const [mode, setMode] = useState<string>();
  const [selectedLang, setSelectedLang] = useState<lang>();
  const [code, setCode] = useState<string>('console.log("Welcome to Monad!");');
  const [title, setTitle] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  function handleLangChange(lang: string) {
    if (langs.find((l) => l.name === lang)) {
      setExtensions([
        typeof langs.find((l) => l.name === lang).extension === "function"
          ? langs.find((l) => l.name === lang).extension()
          : langs.find((l) => l.name === lang).extension,
      ]);
    }
    setMode(lang);
    setSelectedLang(langs.find((l) => l.name === lang));
  }
  useEffect(() => {
    setExtensions(langs.find((l) => l.name === "Javascript").extension());
    setMode("javascript");
  }, []);

  const submitSnippet = async () => {
    setSubmitLoading(true);
    // checks
    if (code.length < 10) {
      toaster.danger("Code is too short!");
      setSubmitLoading(false);
      return;
    } else if (title.length < 3) {
      toaster.danger("Title is too short!");
      setSubmitLoading(false);
      return;
    } else if (title.length > 30) {
      toaster.danger("Title is too long!");
      setSubmitLoading(false);
      return;
    } else if (selectedOption.length < 1) {
      toaster.danger("Please select at least one tag!");
      setSubmitLoading(false);
      return;
    } else if (code === 'console.log("Welcome to Monad!");') {
      toaster.danger("Please write some code!");
      setSubmitLoading(false);
      return;
    }
    // creating the slug for the future snippet page, if there's an already existing snippet with that slug, it'll request a new title
    const slug = slugify(title);
    const { data } = await supabase.from("snippets").select("slug");
    if (data.find((x) => x.slug === slug)) {
      alert("Please select a different title!");
      setSubmitLoading(false);
      return;
    }

    // create new snippet and upload to database
    const newSnippet: snippet = {
      title,
      code,
      tags: selectedOption,
      votes: 0,
      lang: mode,
      slug,
    };
    await supabase.from("snippets").insert(newSnippet);
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
                // if the input is over 1000 characters, revert the changes without modifying the content
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
              <div className="selects">
                <TagInput
                  inputProps={{
                    placeholder: "Add tags",
                  }}
                  tagProps={(value) => {
                    const langObj = langs.find(
                      (l) =>
                        l.name.toLowerCase() === value.toLowerCase() ||
                        l.file.toLowerCase() === value.toLowerCase()
                    );
                    return {
                      color: langObj
                        ? `hsl(${langObj.color}, 100%, 81%)`
                        : "neutral",
                    };
                  }}
                  values={selectedOption}
                  onChange={(values) => {
                    if (values.length > maxOptions) {
                      toaster.warning("You can only select up to 5 tags!", {
                        id: "tag-error"
                      });
                      return;
                    }
                    else if (values.some((x) => x.length > 20)) {
                      toaster.warning("Tags must be under 20 characters!", {
                        id: "tag-error"
                      });
                      return;
                    }
                    else if (values.some((x) => x.length < 2)) {
                      toaster.warning("Tags must be over 1 character!", {
                        id: "tag-error"
                      });
                      return;
                    }
                    else if (findDuplicates(values)) {
                      toaster.warning("Tags must be unique!", {
                        id: "tag-error"
                      });
                      return;
                    }
                    setSelectedOption(values);
                  }}
                  width="100%"
                />
                <SelectMenu
                  options={langs.map((l) => {
                    return {
                      label: l.name,
                      value: l.name,
                    };
                  })}
                  selected={selectedLang ? selectedLang.name : ""}
                  onSelect={(option) => {
                    handleLangChange(option.label);
                  }}
                  hasTitle={false}
                  filterPlaceholder="Search..."
                >
                  <Button type="button" paddingX={30} iconBefore={CodeIcon}>
                    {selectedLang ? `${selectedLang.name}(.${selectedLang.file})` : "Select Language"}
                  </Button>
                </SelectMenu>
              </div>
              <Button
                className="submit-snippet"
                onClick={submitSnippet}
                isLoading={submitLoading}
                paddingX={40}
                fontSize={15}
                type="button"
                intent="success"
              >
                {submitLoading ? "Posting..." : "Post"}
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
