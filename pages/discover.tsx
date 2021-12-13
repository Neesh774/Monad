import { supabase } from "lib/supabaseClient";
import { Pane } from "evergreen-ui";
import { Snippet, User } from "../lib/types";
import DisplaySnippet from "components/displaySnippet";
import { useEffect, useState } from "react";

export default function Discover(props) {
  const loggedIn = supabase.auth.user();
  const snippets = props.snippets as Snippet[];
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function getUser() {
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", loggedIn.id)
        .then(({ data }) => {
          setUser(data[0] as User);
        });
    }
    getUser();
  }, [loggedIn]);

  const recommended = user
    ? getRecommended(snippets, user)
    : snippets.slice(0, 5);

  return (
    <Pane paddingX="3rem" paddingTop="2rem" className="discover-page">
      <h1>Discover</h1>
      <Pane className="top-snippets">
        <h2>Recommended</h2>
        <Pane className="recommended-snippets">
          {recommended.map((snippet) => (
            <DisplaySnippet key={snippet.id} snippet={snippet} />
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
}

export async function getStaticProps() {
  const { data: snippets } = await supabase
    .from("snippets")
    .select("*")
    .eq("listed", true)
    .order("votes", { ascending: false });
  return {
    props: {
      snippets: snippets,
    },
  };
}

function getRecommended(snippets: Snippet[], user: User) {
  const userTags = user.tags;
  if (userTags.length < 1) {
    return snippets.slice(0, 5);
  }
  const recommended = snippets.filter((snippet) => {
    const snippetTags = snippet.tags;
    if (snippetTags) {
      const intersection = snippetTags.filter((tag) => userTags.includes(tag));
      if (intersection.length > 0) {
        return snippet;
      }
    }
  });
  return recommended.slice(0, 5);
}
