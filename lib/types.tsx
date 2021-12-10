export type Snippet = {
  title: string;
  code: string;
  tags: string[];
  votes: number;
  lang: string;
  slug: string;
}

export type Activity = {
  snippet_id: number;
  activity: number;
}

export type User = {
  id: number;
  created_at: string;
  avatar: string;
  snippets: Snippet[];
  activity: Activity[];
}
