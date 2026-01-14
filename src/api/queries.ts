import { apiClient } from './client';
import type { QueryRequest, QueryResponse } from '../types';

export const queriesApi = {
  sendQuery: (data: QueryRequest) =>
    apiClient.post<QueryResponse>('/query/ask', data),
};