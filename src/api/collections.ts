import { apiClient } from './client';
import type { Collection } from '../types';

export const collectionsApi = {
  getAll: () => apiClient.get<Collection[]>('/collections'),
  
  getById: (id: string) => apiClient.get<Collection>(`/collections/${id}`),
  
  create: (data: { name: string; description?: string }) =>
    apiClient.post<Collection>('/collections', data),
  
  delete: (id: string) => apiClient.delete(`/collections/${id}`),

  getChatHistory: (id: string) => apiClient.get(`/collections/${id}/chat-history`),

  ingestTopic: (id: string, data: { topic: string }) =>
    apiClient.post(`/collections/${id}/ingest-topic`, data),

  update: (id: string, data: { name?: string; description?: string }) =>
    apiClient.patch<Collection>(`/collections/${id}`, data),
};