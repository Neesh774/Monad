import { supabase } from "../../lib/supabaseClient";
import { langs, tags } from "../../components/langs";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  IconButton,
  ShareIcon,
  TickIcon,
  toaster,
  Pane,
  Tooltip,
  DuplicateIcon,
  ArrowUpIcon,
  Avatar,
  ArrowDownIcon,
  Button,
  Badge,
  LockIcon,
  UnlockIcon,
  Icon,
} from "evergreen-ui";
import ReactTimeAgo from "react-time-ago";
import Footer from "../../components/Footer";
import { Snippet, Activity, User } from "lib/types";
import MetaTags from "components/MetaTags";
import { useLoggedIn } from "lib/useLoggedIn";

export default function SnippetPage(props : any) {
  const snippetProp : Snippet = props.snippet;
  const {
    code,
    created_at: created,
    lang,
    votes: snippetVotes,
    tags: snippetTags,
    title,
    creator_id: userID,
    creator_avatar: userAvatar,
    creator_name: userName,
    anonymous,
    listed,
  } = snippetProp;
  const { theme } = useTheme();
  const [copy, setCopy] = useState("Copy");
  const [votes, setVotes] = useState(snippetVotes);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [loggedIn, setLoggedIn] = useLoggedIn();
  const router = useRouter();

  const date = new Date(created);
  const langObj = langs.find(
    (l) => l.name.toLowerCase() === lang.toLowerCase()
  );

  const langExtension =
    typeof langObj.extension === "function"
      ? langObj.extension()
      : langObj.extension;

  const share = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.href}`);
      toaster.success("Copied URL to clipboard!");
    }
  };
  const copyCode = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopy("Copied");
      setTimeout(() => {
        setCopy("Copy");
      }, 3000);
    }
  };

  const upvote = async () => {
    if (!loggedIn) {
      toaster.danger("You must be logged in to vote!");
      return;
    }
    let newVotes = votes;
    if (upvoted) {
      // removing vote
      setUpvoted(false);
      setVotes(votes - 1);
      newVotes = votes - 1;
    } else {
      // adding vote
      setUpvoted(true);
      const upvote: Activity = {
        snippet_id: props.snippet.id,
        activity: 1,
      };
      const { error } = await supabase.from("profiles").update({ activity: [...loggedIn.activity, upvote] }).eq("id", loggedIn.id);
      if (error) {
        toaster.danger("Something went wrong!");
        return;
      }
      if (downvoted) {
        setVotes(votes + 2);
        newVotes = votes + 2;
      } else {
        setVotes(votes + 1);
        newVotes = votes + 1;
      }
      setDownvoted(false);
    }
    const { error } = await supabase
      .from("snippets")
      .update({ votes: newVotes })
      .eq("slug", props.snippet.slug);
    if (error) {
      toaster.danger("Something went wrong with that! Please try again later.");
      return;
    }
  };
  const downvote = async () => {
    if (!loggedIn) {
      toaster.danger("You must be logged in to vote!");
      return;
    }
    let newVotes = votes;
    if (downvoted) {
      setDownvoted(false);
      setVotes(votes + 1);
      newVotes = votes + 1;
    } else {
      setDownvoted(true);
      const downvote: Activity = {
        snippet_id: props.snippet.id,
        activity: -1,
      };
      const { error } = await supabase.from("profiles").update({ activity: [...loggedIn.activity, upvote] }).eq("id", loggedIn.id);
      if (error) {
        toaster.danger("Something went wrong!");
        return;
      }
      if (upvoted) {
        setVotes(votes - 2);
        newVotes = votes - 2;
      } else {
        setVotes(votes - 1);
        newVotes = votes - 1;
      }
      setUpvoted(false);
    }
    const { error } = await supabase
      .from("snippets")
      .update({ votes: newVotes })
      .eq("slug", props.snippet.slug);
    if (error) {
      toaster.danger("Something went wrong with that! Please try again later.");
      return;
    }
  };

  return (
    <>
      <MetaTags
        title={`${title} | Monad`}
        description={`${title} on Monad | ${lang} | ${votes} votes`}
      />
      <div className="snippet-page">
        <Pane className="header" display="flex" flexDirection="column">
          <h1>{title}</h1>
          <span>
            <i>
              Created <ReactTimeAgo date={date} locale="en-US" />
            </i>
          </span>
          <Pane
            display="flex"
            alignItems="center"
            alignContent="center"
            gap="0.4rem"
            marginTop="0.4rem"
          >
            {!anonymous ? (
              <Avatar name={userName} src={userAvatar} size={32} />
            ) : (
              <Avatar src="/Nomad.svg" name="Anonymous" size={32} />
            )}
            {!anonymous ? userName : "Anonymous"}
          </Pane>
        </Pane>
        <div className="content">
          <Pane
            borderWidth="2px"
            backgroundColor={theme === "dark" ? "var(--foreground)" : "#fafafa"}
            paddingX="2rem"
            paddingY="1rem"
            borderRadius="10px"
          >
            <Pane
              marginBottom="0.5rem"
              justifyContent="space-between"
              width="100%"
              display="flex"
            >
              <Pane height="2rem">
                {snippetTags.map((tag) => {
                  const tagObj = tags.find((t) => {
                    if (typeof t.name === "string") {
                      return t.name.toLowerCase() === tag.toLowerCase();
                    }
                    return t.name.find((n) => {
                      return n.toLowerCase() === tag.toLowerCase();
                    });
                  });
                  return (
                    <Badge
                      key={tag}
                      marginRight="5px"
                      textTransform="lowercase"
                      fontSize="1rem"
                      height="1.5rem"
                      paddingY="0.2rem"
                      color={
                        (tagObj
                          ? `hsl(${tagObj.color}, 100%, 81%)`
                          : theme === "dark"
                          ? "#3b3b3b"
                          : "neutral") as any
                      }
                      fontWeight="normal"
                    >
                      <span>{tag}</span>
                    </Badge>
                  );
                })}
              </Pane>
              <Pane display="flex" gap="1rem" alignContent="center">
                <Pane display="flex" alignItems="center" gap="1rem">
                  <Tooltip content={!listed ? "Unlisted" : "Listed"}>
                    <Icon icon={!listed ? LockIcon : UnlockIcon} />
                  </Tooltip>
                  {langObj.name}
                </Pane>
                <Button
                  onClick={copyCode}
                  iconBefore={copy === "Copy" ? DuplicateIcon : TickIcon}
                  backgroundColor="var(--input)"
                  color="var(--text-primary)"
                  className="copy-button"
                >
                  {copy}
                </Button>
              </Pane>
            </Pane>
            <CodeMirror
              value={code}
              extensions={[langExtension]}
              editable={false}
              theme={theme === "light" ? "light" : "dark"}
              color="blue"
              maxHeight="23rem"
            />
          </Pane>
          <Pane className="actions" gap="0.4rem">
            <Pane
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="0.4rem"
            >
              <Tooltip content="Downvote">
                <IconButton
                  icon={ArrowDownIcon}
                  appearance="minimal"
                  onClick={downvote}
                  className={`${downvoted ? "downvoted" : ""} downvote`}
                />
              </Tooltip>
              {votes}
              <Tooltip content="Upvote">
                <IconButton
                  icon={ArrowUpIcon}
                  appearance="minimal"
                  onClick={upvote}
                  className={`${upvoted ? "upvoted" : ""} upvote`}
                />
              </Tooltip>
            </Pane>
            <Tooltip content="Share Snippet">
              <IconButton
                icon={ShareIcon}
                onClick={() => share()}
                appearance="minimal"
                width={40}
                height={40}
              />
            </Tooltip>
          </Pane>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const { data } = await supabase
    .from("snippets")
    .select("*")
    .eq("slug", slug)
    .limit(1);

  let loggedIn;
  if(supabase.auth.user()) {
    let { data: loggedIn } = await supabase.from("profiles").select("*").eq("id", supabase.auth.user().id);
  }

  const snippet: Snippet = data[0];
  return {
    props: {
      snippet,
      user: loggedIn ? loggedIn[0] : null,
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
