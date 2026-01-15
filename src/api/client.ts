const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const apiClient = {
  get: <T>(endpoint: string) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return res.json();
    });
  },

  post: <T>(endpoint: string, data: unknown) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return res.json();
    });
  },

  put: <T>(endpoint: string, data: unknown) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return res.json();
    });
  },

  delete: <T>(endpoint: string) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return res.json();
    });
  },

  patch: <T>(endpoint: string, data: unknown) => {
    return fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return res.json();
    });
  },
};