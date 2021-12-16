import { supabase } from "../lib/supabaseClient";
import CodeMirror from "@uiw/react-codemirror";
import slugify from "slugify";
import { useTheme } from "next-themes";
import { useRouter } from "next/dist/client/router";
import { langs, tags } from "../components/langs";
import React, { useState, useEffect } from "react";
import { Extension } from "@codemirror/state";
import MetaTags from "components/MetaTags";
import { Snippet, Lang } from "lib/types";
import {
  toaster,
  Button,
  TextInput,
  TagInput,
  SelectMenu,
  CodeIcon,
  Tooltip,
  Pane,
  LockIcon,
  UnlockIcon,
  IconButton,
} from "evergreen-ui";

const maxOptions = 5;
function findDuplicates(arr: string[]) {
  return new Set(arr).size !== arr.length;
}

export default function Home() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<string>();
  const [selectedLang, setSelectedLang] = useState<Lang>();
  const [code, setCode] = useState<string>('console.log("Welcome to Monad!");');
  const [title, setTitle] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [listed, setListed] = useState<boolean>(true);
  const router = useRouter();

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
    else if (!selectedLang){
      toaster.danger("Please select a language!");
      setSubmitLoading(false);
      return;
    }

    // creating the slug for the future snippet page, if there's an already existing snippet with that slug, it'll request a new title
    const slug = slugify(title);
    const { data: slugs } = await supabase.from("snippets").select("slug");
    if (slugs.find((x) => x.slug === slug)) {
      alert("Please select a different title!");
      setSubmitLoading(false);
      return;
    }

    // create new snippet and upload to database
    const newSnippet: Snippet = {
      title,
      code,
      tags: selectedOption,
      votes: 0,
      lang: mode,
      slug,
      creator_id: supabase.auth.user() ? supabase.auth.user().id : "",
      creator_avatar: supabase.auth.user()
        ? supabase.auth.user().user_metadata.avatar_url
        : "",
      creator_name: supabase.auth.user()
        ? supabase.auth.user().user_metadata.user_name
        : "",
      anonymous: supabase.auth.user() ? false : true,
      listed: listed,
    };
    const { data : created, error } = await supabase.from("snippets").insert(newSnippet);
    if (error) {
      toaster.danger("Something went wrong! Please try again later.");
      setSubmitLoading(false);
      return;
    }
    else {
      selectedOption.forEach(async (tag) => {
        console.log(tag);
        const { data: existingArr, error } = await supabase.from("tags").select("*").eq("tag_name", tag).limit(1) as any;
        const existing = existingArr[0];
        console.log("error", error);
        console.log("existing", existing);
        const { error: tagError} = await supabase.from("tags").upsert({
          tag_name: tag,
          snippets: existing ? existing.snippets.concat(created) : created,
          num_used: existing ? existing.num_used + 1 : 1,
        });
        console.log("tagError", tagError);
      })
    }
    setSubmitLoading(false);
    router.push(`/snippets/${slug}`);
    if (!listed) {
      toaster.success(
        "Your private snippet was submitted! You can now share the link and it won't show up on our discover page."
      );
    } else {
      toaster.success("Snippet submitted!");
    }
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
            <Pane
              display="flex"
              paddingY="auto"
              alignItems="center"
              gap="0.4em"
              marginBottom="0.5rem"
              className="title-input"
            >
              <TextInput
                placeholder="Title"
                className="snippet-title"
                required
                backgroundColor="var(--input)"
                color="var(--text-primary)"
                alt="Set the title of your snippet"
                height={40}
                onChange={(v) => {
                  setTitle(v.target.value);
                }}
              />
              <Tooltip content={`${listed ? "Listed" : "Unlisted"}`}>
                <IconButton height={40} type="button" appearance="minimal" icon={listed ? UnlockIcon : LockIcon} onClick={() => {setListed(!listed)}} />
              </Tooltip>
            </Pane>
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
                    color: "var(--text-primary)",
                  }}
                  tagProps={(value) => {
                    const tagObj = tags.find((t) => {
                      if (typeof t.name === "string") {
                        return t.name.toLowerCase() === value.toLowerCase();
                      }
                      return t.name.find((n) => {
                        return n.toLowerCase() === value.toLowerCase();
                      });
                    });
                    return {
                      color: tagObj
                        ? `hsl(${tagObj.color}, 100%, 81%)`
                        : theme === "dark"
                        ? "#5b5b5b"
                        : "neutral",
                    };
                  }}
                  values={selectedOption}
                  backgroundColor="var(--input)"
                  className="tag-input"
                  onChange={(values) => {
                    if (values.length > maxOptions) {
                      toaster.warning("You can only select up to 5 tags!", {
                        id: "tag-error",
                      });
                      return;
                    } else if (values.some((x) => x.length > 20)) {
                      toaster.warning("Tags must be under 20 characters!", {
                        id: "tag-error",
                      });
                      return;
                    } else if (values.some((x) => x.length < 2)) {
                      toaster.warning("Tags must be over 1 character!", {
                        id: "tag-error",
                      });
                      return;
                    } else if (findDuplicates(values)) {
                      toaster.warning("Tags must be unique!", {
                        id: "tag-error",
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
                  closeOnSelect={true}
                  selected={selectedLang ? selectedLang.name : ""}
                  onSelect={(option) => {
                    handleLangChange(option.label);
                  }}
                  hasTitle={false}
                  filterPlaceholder="Search..."
                >
                  <Button
                    type="button"
                    className="lang-select"
                    width={220}
                    iconBefore={CodeIcon}
                    resize="none"
                    backgroundColor="var(--input)"
                    color="var(--text-primary)"
                  >
                    {selectedLang
                      ? `${selectedLang.name}(.${selectedLang.file})`
                      : "Select Language"}
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