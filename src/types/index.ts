export interface Paper {
  id: string;
  title: string;
  authors?: string[];
  year?: number;
  abstract?: string;
  pdf_url?: string;
  created_at?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at?: string;
  total_papers?: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface Chat {
  id: string;
  collection_id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at?: string;
}

export interface QueryRequest {
  collection_id: string;
  query: string;
  chat_id?: string;
}

export interface QueryResponse {
  answer: string;
  sources?: Paper[];
  chat_id: string;
}