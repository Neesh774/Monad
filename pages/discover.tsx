import { supabase } from "lib/supabaseClient";
import { Pane, Select, Pagination, Spinner } from "evergreen-ui";
import { Snippet, User } from "../lib/types";
import DisplaySnippet from "components/displaySnippet";
import { useEffect, useState } from "react";
import Footer from "components/Footer";
import { useTheme } from "next-themes";
import MetaTags from "components/MetaTags";

export default function Discover() {
  const loggedIn = supabase.auth.user();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filtered, setFiltered] = useState<Snippet[]>([]);
  const [user, setUser] = useState<User>();
  const [filter, setFilter] = useState<string>("popular");
  const [order, setOrder] = useState<string>("false");
  const [pageNum, setPageNum] = useState<number>(1);
  const [page, setPage] = useState<number>(0);
  const { theme } = useTheme();

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

    async function getSnippets() {
      const { data: snippets } = await supabase
        .from("snippets")
        .select("*")
        .eq("listed", true)
        .order("votes", { ascending: false });
      setSnippets(snippets);
      setFiltered(snippets);
    }

    getSnippets();
  }, [loggedIn, order]);

  const changeOrder = async (order: string) => {
    setOrder(order);
    const { data: snippets } = await supabase
      .from("snippets")
      .select("*")
      .eq("listed", true)
      .order("votes", { ascending: JSON.parse(order) });
    setFiltered(snippets);
  };
  const changeFilter = async (filter: string) => {
    setFilter(filter);
    if (filter === "latest") {
      const { data: snippets } = await supabase
        .from("snippets")
        .select("*")
        .eq("listed", true)
        .order("created_at", { ascending: JSON.parse(order) });
      setFiltered(snippets);
    } else if (filter === "popular") {
      const { data: snippets } = await supabase
        .from("snippets")
        .select("*")
        .eq("listed", true)
        .order("votes", { ascending: JSON.parse(order) });
      setFiltered(snippets);
    }
  };

  const generatePage = (page: number) => {
    setPageNum(page);
    setPage((page - 1) * 5);
  };

  const recommended = user ? getRecommended(snippets, user) : [];

  return (
    <>
      <MetaTags title="Discover"description="Discover new snippets on Monad"/>
      <Pane paddingX="3rem" paddingTop="2rem" className="discover-page" marginBottom="2rem" backgroundColor={theme === 'dark' ? 'var(--foreground)' : 'var(--background)'}>
        <h1>Discover</h1>
        <Pane
          display="flex"
          flexDirection="row"
          marginTop="1rem"
          justifyContent="space-between"
        >
          <Pane className="discover" width="60%">
            <Pane className="filters" display="flex" width="250px" gap="1rem">
              <Select
                onChange={(event) => {
                  changeOrder(event.target.value);
                }}
                defaultValue="false"
              >
                <option value="false">Descending</option>
                <option value="true">Ascending</option>
              </Select>
              <Select
                onChange={(event) => {
                  changeFilter(event.target.value);
                }}
                defaultValue="popular"
              >
                <option value="popular">Most Popular</option>
                <option value="latest">Latest</option>
              </Select>
            </Pane>
            <Pane marginTop="1rem" display="flex" flexDirection="column">
              <Pane className="filtered-snippets" width="100%" display="flex" flexDirection="column" gap="1rem">
                {filtered.slice(page, page + 5).map((snippet, index) => {
                  console.log(index);
                  return <DisplaySnippet key={snippet.id} snippet={snippet} />;
                })}
              </Pane>
              <Pagination
                marginTop="0.5rem"
                page={pageNum}
                totalPages={Math.ceil(snippets.length / 5)}
                onNextPage={() => generatePage(pageNum + 1)}
                onPreviousPage={() => generatePage(pageNum - 1)}
                onPageChange={(pageNum) => generatePage(pageNum)}
              />
            </Pane>
          </Pane>
          <Pane className="recommended">
            <Pane backgroundColor="var(--foreground)" borderRadius="10px" paddingY="1rem" paddingX="1.5rem">
              <h2>Recommended</h2>
              <Pane className="recommended-snippets" marginTop="1rem">
                {recommended.length > 0 ? (
                  recommended.map((snippet) => (
                    <DisplaySnippet key={snippet.id} snippet={snippet} />
                  ))
                ) : (
                  <Spinner marginX="auto" />
                )}
              </Pane>
            </Pane>
          </Pane>
        </Pane>
      </Pane>
      <Footer />
    </>
  );
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
