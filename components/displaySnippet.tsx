import { Pane, Badge, Avatar, Tooltip, Pill } from "evergreen-ui";
import { langs, tags } from "./langs";
import { useTheme } from "next-themes";
import { Snippet } from "lib/types";
import { supabase } from "lib/supabaseClient";
import { downloadImage } from "lib/downloadImage";
import { getAnonymous } from "lib/getAnonymousAvatar";
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";

export default function DisplaySnippet({
  snippet,
  upvoted,
  downvoted,
}: {
  snippet: Snippet;
  upvoted?: boolean;
  downvoted?: boolean;
}) {
  const { theme } = useTheme();
  const [creatorAvatar, setCreatorAvatar] = useState<string>();
  const [creatorName, setCreatorName] = useState<string>();
  const [loading, setLoading] = useState(true);
  const langObj = langs.find((lang) => lang.name === snippet.lang);
  useEffect(() => {
    async function getUser() {
      if (snippet.creator_id) {
        const avatar = downloadImage(snippet.creator_id);
        setCreatorAvatar(avatar);

        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", snippet.creator_id)
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
  });
  if (loading) return null;
  return (
    <a href={`/snippets/${snippet.slug}`} className="display-snippet-link">
      <Pane
        display="flex"
        flexDirection="row"
        marginBottom="0.4rem"
        borderRadius={10}
        className={`display-snippet${theme === "dark" ? "-dark" : ""}`}
        alignItems="center"
        justifyContent="space-between"
        padding="16px"
      >
        <Pane display="flex" flexDirection="column" gap={4}>
          <Pane display="flex" alignItems="center" gap={6}>
            <h3>{snippet.title}</h3>
            {langObj.image ? (
              <Tooltip content={langObj.name}>
                <img
                  src={langObj.image}
                  alt={langObj.name}
                  width={20}
                  height={20}
                />
              </Tooltip>
            ) : (
              <Badge>{langObj.name}</Badge>
            )}
          </Pane>
          <Pane marginTop="0.4rem" display="flex" alignItems="center" gap={6}>
            <Pane
              display="flex"
              alignItems="center"
              alignContent="center"
              gap="0.4rem"
            >
              <Avatar name={creatorName} src={creatorAvatar} size={24} />

              {!snippet.anonymous ? creatorName : "Anonymous"}
            </Pane>
            &bull;{" "}
            <i className="display-date">
              <ReactTimeAgo
                date={new Date(snippet.created_at)}
                locale="en-US"
              />
            </i>
          </Pane>
          <Pane marginTop="0.5rem">
            {snippet.tags.map((tag) => {
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
                  marginY="3px"
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
        </Pane>
        <Pane
          fontSize="2.5rem"
          display="flex"
          color={snippet.votes >= 0 ? "var(--blue)" : "var(--red)"}
          verticalAlign="middle"
          marginX="1.5rem"
        >
          {(upvoted || downvoted) && (
            <Pane alignItems="center" display="flex" flexDirection="column" gap=".5rem">
              <span>{snippet.votes}</span>
              <Pill
                width="30px"
                color={upvoted ? "blue" : "red"}
                fontSize="1.5rem"
                height="1.3rem"
              >
                {upvoted ? "+" : "-"}
              </Pill>
            </Pane>
          )}
          {!upvoted && !downvoted && snippet.votes}
        </Pane>
      </Pane>
    </a>
  );
}
