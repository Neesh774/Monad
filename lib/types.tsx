export type Snippet = {
  title: string;
  id?: string;
  created_at?: Date;
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
  id: string; 
  email: string;
  username: string;
  created_at?: string;
  avatar?: string;
  snippets: Snippet[];
  activity: Activity[];
  tags: string[];
}

export type Lang = {
  extension: any;
  file: string;
  name: string;
  image?: string;
}

export type Tag = {
  name: string|string[];
  color: number;
}