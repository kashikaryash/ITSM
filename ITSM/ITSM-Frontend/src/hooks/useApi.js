// hooks/useApi.js
import { useState, useCallback } from 'react';

export const useApi = (baseURL = '/api') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${baseURL}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options.headers
        },
        ...options
      };

      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data, success: true };
    } catch (err) {
      setError(err.message);
      return { error: err.message, success: false };
    } finally {
      setLoading(false);
    }
  }, [baseURL]);

  const get = useCallback((endpoint, options = {}) => {
    return request(endpoint, { method: 'GET', ...options });
  }, [request]);

  const post = useCallback((endpoint, body, options = {}) => {
    return request(endpoint, { method: 'POST', body, ...options });
  }, [request]);

  const put = useCallback((endpoint, body, options = {}) => {
    return request(endpoint, { method: 'PUT', body, ...options });
  }, [request]);

  const del = useCallback((endpoint, options = {}) => {
    return request(endpoint, { method: 'DELETE', ...options });
  }, [request]);

  const patch = useCallback((endpoint, body, options = {}) => {
    return request(endpoint, { method: 'PATCH', body, ...options });
  }, [request]);

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    delete: del,
    patch
  };
};