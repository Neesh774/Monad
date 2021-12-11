export type Snippet = {
  title: string;
  code: string;
  tags: string[];
  votes: number;
  lang: string;
  slug: string;
  creator_id: string;
  creator_avatar: string;
  creator_name: string;
  anonymous: boolean;
  listed: boolean;
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

export type Lang = {
  extension: any;
  file: string;
  name: string;
}

export type Tag = {
  name: string|string[];
  color: number;
}