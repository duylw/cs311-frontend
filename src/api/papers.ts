import { apiClient } from './client';
import type { Paper } from '../types';

export const papersApi = {
  getByCollection: (collectionId: string, num?: number) =>
    apiClient.get<Paper[]>(`/papers/collections/${collectionId}/papers?skip=0&limit=${num ?? 100}`),
  
  search: (query: string) =>
    apiClient.post<Paper[]>('/papers/search', { query }),

  deletePaper: (collectionId: string, paperId: string) =>
    apiClient.delete(`/papers/collections/${collectionId}/papers/${paperId}`),
};