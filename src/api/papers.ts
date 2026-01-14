import { apiClient } from './client';
import type { Paper } from '../types';

export const papersApi = {
  getByCollection: (collectionId: string) =>
    apiClient.get<Paper[]>(`/papers/collections/${collectionId}/papers`),
  
  addToCollection: (collectionId: string, data: { url?: string; title?: string; content?: string }) =>
    apiClient.post<Paper>(`/collections/${collectionId}/papers`, data),
  
  search: (query: string) =>
    apiClient.post<Paper[]>('/papers/search', { query }),
};