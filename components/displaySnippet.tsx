import { Pane, Badge } from "evergreen-ui";
import { langs, tags } from "./langs";
import { useTheme } from "next-themes";
import { Snippet } from "lib/types";
import { useRouter } from "next/router";

export default function DisplaySnippet({ snippet }: { snippet: Snippet }) {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <a href={`/snippets/${snippet.slug}`} className="display-snippet-link">
      <Pane
        padding={16}
        display="flex"
        flexDirection="column"
        marginBottom="0.4rem"
        borderRadius={10}
        className={`display-snippet${theme === "dark" ? "-dark" : ""}`}
      >
        <h3>{snippet.title}</h3>
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
    </a>
  );
}
