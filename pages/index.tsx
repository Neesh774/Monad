import { supabase } from "../lib/supabaseClient";
import CodeMirror from "@uiw/react-codemirror";
import slugify from "slugify";
import { useRouter } from "next/dist/client/router";
import { langs, tags } from "../components/langs";
import React, { useState, useEffect } from "react";
import { Extension } from "@codemirror/state";
import MetaTags from "components/MetaTags";
import { Snippet, Lang, User } from "lib/types";
import {
  toaster,
  Button,
  TextInput,
  Tooltip,
  Pane,
  LockIcon,
  UnlockIcon,
  IconButton,
} from "evergreen-ui";
import { useLoggedIn } from "lib/useLoggedIn";
import Filter from "bad-words";
import TagSelector from "components/TagSelector";
import LanguageSelector from "components/LanguageSelector";

const filter = new Filter();

export default function Home() {
  const [mode, setMode] = useState<string>();
  const [selectedLang, setSelectedLang] = useState<Lang>();
  const [code, setCode] = useState('console.log("Welcome to Monad!");');
  const [title, setTitle] = useState("");
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [listed, setListed] = useState(true);
  const loggedIn = useLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes("type=recover")) {
      const access_token = router.asPath.split("&")[0].split("=")[1];
      router.push({ pathname: "/password-reset", query: { access_token } }, undefined, { shallow: true });
    }
  }, [router]);

  function handleLangChange(lang: Lang) {
    if (langs.find((l) => l.name === lang.name)) {
      setExtensions([
        typeof langs.find((l) => l.name === lang.name).extension === "function"
          ? lang.extension()
          : lang.extension,
      ]);
    }
    setMode(lang.name);
    setSelectedLang(lang);
  }

  useEffect(() => {
    setExtensions(langs.find((l) => l.name === "Javascript").extension());
    setMode("Javascript");
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
    } else if (!selectedLang) {
      toaster.danger("Please select a language!");
      setSubmitLoading(false);
      return;
    } else if (filter.isProfane(title) || filter.isProfane(code) || filter.isProfane(selectedOption.join(" "))) {
      toaster.danger("Profanity detected in snippet.");
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
      creator_id: loggedIn ? loggedIn.id : null,
      anonymous: loggedIn ? false : true,
      listed: listed,
    };
    const { data: created, error } = await supabase
      .from("snippets")
      .insert(newSnippet)
      .limit(1) as { data: Snippet[], error: any };
    if (error) {
      toaster.danger("Something went wrong! Please try again later.");
      console.log(error);
      setSubmitLoading(false);
      return;
    } else {
      selectedOption.forEach(async (tag) => {
        const { data: existingArr, error } = (await supabase
          .from("tags")
          .select("*")
          .eq("tag_name", tag)
          .limit(1)) as any;
        const existing = existingArr[0];
        const { error: tagError } = await supabase.from("tags").upsert({
          tag_name: tag,
          snippets: existing && existing.snippets && Array.isArray(existing.snippets) ? existing.snippets.concat(created) : created,
          num_used: existing ? existing.num_used + 1 : 1,
        });
      });

      if (supabase.auth.user()) {
        const { data }: { data: User } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", supabase.auth.user().id)
          .single();
        const newSnippets = data.snippets.concat(created);
        const { error } = await supabase
          .from("profiles")
          .update({ snippets: newSnippets })
          .eq("id", supabase.auth.user().id);
        if (error) {
          toaster.danger("Something went wrong! Please try again later.");
          console.log(error);
          setSubmitLoading(false);
          return;
        }
      }
    }
    setSubmitLoading(false);
    router.push(`/snippets/${slug}`, undefined, { shallow: true });
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
              <Tooltip content={`${listed ? "Snippet will be visible in Search and Discover" : "Snippet can only be viewed by link"}`}>
                <IconButton
                  height={40}
                  type="button"
                  appearance="minimal"
                  icon={listed ? UnlockIcon : LockIcon}
                  onClick={() => {
                    setListed(!listed);
                  }}
                />
              </Tooltip>
            </Pane>
            <CodeMirror
              value={code}
              height="200px"
              className="snippet-code"
              extensions={extensions}
              theme="light"
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
                <TagSelector selectedTags={selectedOption} setSelectedTags={setSelectedOption} />
                <LanguageSelector selectedLang={selectedLang} onChange={handleLangChange} />
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
