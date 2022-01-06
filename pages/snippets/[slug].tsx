import { supabase } from "../../lib/supabaseClient";
import { langs, tags } from "../../components/langs";
import CodeMirror from "@uiw/react-codemirror";
import { useState, useEffect, useRef } from "react";
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
  Text,
  Spinner,
  Heading,
} from "evergreen-ui";
import ReactTimeAgo from "react-time-ago";
import Footer from "../../components/Footer";
import { Snippet, Activity, User } from "lib/types";
import MetaTags from "components/MetaTags";
import { useLoggedIn } from "lib/useLoggedIn";
import { downloadImage } from "lib/downloadImage";
import { getAnonymous } from "lib/getAnonymousAvatar";
import { GetServerSideProps } from "next";

export default function SnippetPage(props: any) {
  const snippetProp: Snippet = props.snippet;
  const {
    code,
    created_at: created,
    lang,
    votes: snippetVotes,
    tags: snippetTags,
    title,
    anonymous,
    listed,
    creator_id,
  } = snippetProp;
  const [copy, setCopy] = useState("Copy");
  const [votes, setVotes] = useState(snippetVotes);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [creatorAvatar, setCreatorAvatar] = useState<string>();
  const [creatorName, setCreatorName] = useState<string>();
  const [loading, setLoading] = useState(true);
  const loggedIn = useLoggedIn();
  const userId = useRef<String>();
  const userActivity = useRef<Activity[]>();
  const snippet = useRef<Snippet>(snippetProp);

  useEffect(() => {
    if (loggedIn) {
      userId.current = loggedIn.id;
      userActivity.current = loggedIn.activity;
      const activity = loggedIn.activity.find(
        (activity) => activity.snippet.id === snippetProp.id
      );
      if (activity) {
        setUpvoted(activity.upvoted);
        setDownvoted(activity.downvoted);
      }
    }
    async function getUser() {
      if (creator_id) {
        const avatar = downloadImage(creator_id);
        setCreatorAvatar(avatar);

        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", creator_id)
          .single();
        if (error) {
          setCreatorName("Anonymous");
        } else {
          setCreatorName(data.username);
        }
      } else {
        setCreatorName("Anonymous");
        const anonymousAvatar = getAnonymous();
        setCreatorAvatar(anonymousAvatar);
      }
      setLoading(false);
    }
    getUser();
  }, [loggedIn, snippetProp, creator_id, creatorAvatar]);

  useEffect(() => {
    if (userActivity.current) {
      updateVotes(
        upvoted,
        downvoted,
        snippet.current.valueOf() as Snippet,
        userId.current.valueOf(),
        userActivity.current.valueOf() as Activity[]
      );
    }
  }, [upvoted, downvoted]);

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
      setUpvoted(false);
      setDownvoted(true);
      if (upvoted) {
        setVotes(votes - 2);
        newVotes = votes - 2;
      } else {
        setVotes(votes - 1);
        newVotes = votes - 1;
      }
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
        description={`${title} on Monad | Written in ${lang} | ${votes} votes`}
      />
      <div className="snippet-page">
        {!loading ? (
          <>
            {" "}
            <Pane className="header" display="flex" flexDirection="column">
              <Heading size={900}>{title}</Heading>
              <Text size={500}>
                <i>
                  Created <ReactTimeAgo date={date} locale="en-US" />
                </i>
              </Text>
              <Pane
                display="flex"
                alignItems="center"
                alignContent="center"
                gap="0.4rem"
                marginTop="0.4rem"
              >
                <Avatar name={creatorName} src={creatorAvatar} size={32} />
                <Text size={500}>{creatorName}</Text>
              </Pane>
            </Pane>
            <div className="content">
              <Pane
                borderWidth="2px"
                backgroundColor="#fafafa"
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
                              : "neutral") as any
                          }
                          fontWeight="normal"
                        >
                          <Text>{tag}</Text>
                        </Badge>
                      );
                    })}
                  </Pane>
                  <Pane display="flex" gap="1rem" alignContent="center">
                    <Pane display="flex" alignItems="center" gap="1rem">
                      <Tooltip content={!listed ? "Unlisted" : "Listed"}>
                        <Icon icon={!listed ? LockIcon : UnlockIcon} />
                      </Tooltip>
                      <Text size={500}>{langObj.name}</Text>
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
                  theme="light"
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
          </>
        ) : (
          <Pane display="flex" alignItems="center" flex="1 0 auto">
            <Spinner marginX="auto" />
          </Pane>
        )}
      </div>
      <Footer />
    </>
  );
}

async function updateVotes(
  upvote: boolean,
  downvote: boolean,
  snippet: Snippet,
  userId: string,
  activity: Activity[]
) {
  const vote: Activity = {
    snippet: snippet,
    upvoted: upvote,
    downvoted: downvote,
  };
  const newVotes = activity.filter((a) => a.snippet.id !== snippet.id);
  if (downvote || upvote) {
    newVotes.push(vote);
  }
  const { error } = await supabase
    .from("profiles")
    .update({ activity: newVotes })
    .eq("id", userId);
  if (error) {
    toaster.danger("Something went wrong!");
    return;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.slug;
  const { data } = await supabase
    .from("snippets")
    .select("*")
    .eq("slug", slug)
    .limit(1);

  let loggedIn;
  if (supabase.auth.user()) {
    let { data: loggedIn } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", supabase.auth.user().id);
  }

  const snippet: Snippet = data[0];
  return {
    props: {
      snippet,
      user: loggedIn ? loggedIn[0] : null,
    },
  };
};
