import { Dialog, Pane, SearchInput, Autocomplete, Spinner } from "evergreen-ui";
import fuzzaldrin from "fuzzaldrin-plus";
import { supabase } from "lib/supabaseClient";
import { useState } from "react";
import DisplaySnippet from "./displaySnippet";
import { useRouter } from "next/router";
import { Snippet } from "lib/types";

export default function SearchDialog({ snippets }: { snippets: Snippet[] }) {
  const [isShown, setIsShown] = useState(false);
  const [search, setSearch] = useState("");

  const snippetTags = snippets.reduce((acc, curr) => acc.concat(curr.tags), []);

  const fuzzyFilter = (input) => {
    const snippetResults = fuzzaldrin.filter(
      snippets.map((snippet) => snippet.title),
      input
    );
    const snippetsWithTitles = snippets.filter((snippet) =>{
      return snippetResults.includes(snippet.title);
    });

    const tagResults : string[] = fuzzaldrin.filter(snippetTags, input);
    const snippetsWithTags = snippets.filter((snippet) => {
      return tagResults.some((tag) => snippet.tags.includes(tag));
    })

    const duplicates = snippetsWithTitles.concat(snippetsWithTags);
    const uniqueSnippets = Array.from(new Set(duplicates));
    return uniqueSnippets;
  };

  return (
    <>
      <Dialog
        isShown={isShown}
        title="Search for Snippets"
        onCloseComplete={() => setIsShown(false)}
        hasFooter={false}
        preventBodyScrolling={true}
      >
        <Pane marginBottom="3rem">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            marginBottom={16}
            autoFocus={true}
          />
          <Pane>
            {search.length === 0 ? (
              <div>Search up some keywords or tags to find a snippet!</div>
            ) : (
              <Pane>
                <Pane marginBottom="0.4rem">
                  <h2>Results for: {search}</h2>
                </Pane>
                {fuzzyFilter(search).length > 0
                  ? fuzzyFilter(search).map((snippet, index) => {
                      return (
                        <DisplaySnippet snippet={snippet} key={index} />
                      );
                    })
                  : "No results"}
              </Pane>
            )}
          </Pane>
        </Pane>
      </Dialog>
      <SearchInput
        placeholder="Search for a snippet..."
        onFocus={() => setIsShown(true)}
      />
    </>
  );
}
