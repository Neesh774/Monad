import { supabase } from "lib/supabaseClient";
import MetaTags from "../../components/MetaTags";
import { User, Snippet, Activity } from "lib/types";
import { tags } from "components/langs";
import { useState } from "react";
import {
  Avatar,
  EmptyState,
  Pane,
  Badge,
  Tablist,
  Tab,
  SatelliteIcon,
} from "evergreen-ui";
import { useTheme } from "next-themes";
import DisplaySnippet from "components/displaySnippet";

export default function UserPage({ user }: { user: User }) {
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme } = useTheme();

  return (
    <>
      <MetaTags
        title={`${user.username}'s Profile | Monad`}
        description={`View ${user.username}'s profile on Monad.`}
      />
      <Pane
        className="user-page"
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <Pane
          className="user-left"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
        >
          <Avatar src={user.avatar} name={user.username} size={200} />
          <h1 className="user-name">{user.username}</h1>
          <i>
            Joined{" "}
            <time dateTime={user.created_at}>
              {new Date(user.created_at).toLocaleDateString()}
            </time>
          </i>
          <Pane width="50%" display="flex" flexDirection="column" gap="0.5rem">
            <div>
              <h3>Bio</h3>
              <p>{user.bio || "Nothing to see here ^-^"}</p>
            </div>
            <div>
              <h3>Tags</h3>
              <Pane marginTop="0.5rem">
                {user.tags.length < 1
                  ? "Nothing to see here ^-^"
                  : user.tags.map((tag) => {
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
                          marginLeft="5px"
                          textTransform={tagObj ? "none" : "capitalize"}
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
            </div>
          </Pane>
        </Pane>
        <Pane className="user-right" flexDirection="column" width="40%">
          <Pane display="flex">
            <Tablist
              marginBottom={16}
              paddingX="0.5rem"
              paddingY="0.3rem"
              borderRadius="10px"
              backgroundColor="#f7f7f7"
            >
              <Tab
                key="snippets"
                id="snippets"
                onClick={() => setSelectedIndex(0)}
                isSelected={selectedIndex === 0}
                aria-controls="panel-0"
              >
                Snippets
              </Tab>
              <Tab
                key="activity"
                id="activity"
                onClick={() => setSelectedIndex(1)}
                isSelected={selectedIndex === 1}
                aria-controls="panel-1"
              >
                Activity
              </Tab>
            </Tablist>
          </Pane>
          <Pane flex="1" marginTop={20} paddingRight="8px" className="snippet-display">
            <Pane
              key={0}
              id="panel-0"
              role="tabpanel"
              aria-labelledby="0"
              aria-hidden={0 !== selectedIndex}
              display={0 === selectedIndex ? "block" : "none"}
            >
              {user.snippets.length > 0 ? (
                user.snippets.map((snippet) => {
                  return <DisplaySnippet key={snippet.id} snippet={snippet} />;
                })
              ) : (
                <EmptyState
                  background={theme === "light" ? "light" : "dark"}
                  title="This user has no snippets"
                  orientation="vertical"
                  icon={<SatelliteIcon color="#ff6682" />}
                  iconBgColor="#ffc4cf"
                />
              )}
            </Pane>
            <Pane
              key={1}
              id="panel-1"
              role="tabpanel"
              aria-labelledby="1"
              aria-hidden={1 !== selectedIndex}
              display={1 === selectedIndex ? "block" : "none"}
            >
              {user.activity.length > 0 ? (
                user.activity.map((activity) => {
                  return <DisplaySnippet key={activity.snippet.id} snippet={activity.snippet} upvoted={activity.upvoted} downvoted = {activity.downvoted} />;
                })
              ) : (
                <EmptyState
                  background={theme === "light" ? "light" : "dark"}
                  title="This user has no activity"
                  orientation="vertical"
                  icon={<SatelliteIcon color="#ff6682" />}
                  iconBgColor="#ffc4cf"
                />
              )}
            </Pane>
          </Pane>
        </Pane>
      </Pane>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.user_name;
  const { data: user } = await supabase
    .from("profiles")
    .select(`*`)
    .eq("username", slug);
  return {
    props: {
      user: user[0],
    },
  };
}

export async function getStaticPaths() {
  const { data } = await supabase.from("profiles").select("username");
  if (!data) return { paths: [], fallback: true };
  const paths = data.map((item) => {
    return {
      params: {
        user_name: item.username,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
