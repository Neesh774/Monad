import { Pane, Badge, Avatar, Tooltip } from "evergreen-ui";
import { langs, tags } from "./langs";
import { useTheme } from "next-themes";
import { Snippet } from "lib/types";
import { useRouter } from "next/router";
import ReactTimeAgo from "react-time-ago";

export default function DisplaySnippet({ snippet }: { snippet: Snippet }) {
  const { theme } = useTheme();
  const router = useRouter();
  const langObj = langs.find((lang) => lang.name === snippet.lang);
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
      >
        <Pane padding={16} display="flex" flexDirection="column" gap={4}>
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
              {!snippet.anonymous ? (
                <Avatar
                  name={snippet.creator_name}
                  src={snippet.creator_avatar}
                  size={24}
                />
              ) : (
                <Avatar src="/Nomad.svg" name="Anonymous" size={32} />
              )}
              {!snippet.anonymous ? snippet.creator_name : "Anonymous"}
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
        <Pane fontSize="2.5rem" display="flex" color={snippet.votes >= 0 ? "var(--blue)" : "var(--red)"} verticalAlign="middle" marginX="1.5rem">
          <span>{snippet.votes}</span>
        </Pane>
      </Pane>
    </a>
  );
}
