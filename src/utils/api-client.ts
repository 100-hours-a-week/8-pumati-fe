import { refresh } from '@/features/auth/services';
import { InfiniteScrollResponse, PaginationMeta } from '@/schemas';
import { accessTokenAtom } from '@/store/atoms';
import { getDefaultStore } from 'jotai';
import { ApiError } from './error';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig {
  method?: RequestMethod;
  headers?: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  credentials?: RequestCredentials;
  next?: NextFetchRequestConfig;
}

interface ApiResponse<T> {
  data?: T;
  message: string;
}

export const fetchWithConfig = async <T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<T> => {
  const { method = 'GET', headers = {}, body, credentials, next } = config;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials,
      next: next ?? undefined,
    });

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new ApiError(500, 'An unexpected error occurred');
  }
};

export const apiClient = async <T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<ApiResponse<T>> => {
  return fetchWithConfig<ApiResponse<T>>(endpoint, config);
};

export const infiniteApiClient = async <T, M = PaginationMeta>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<InfiniteScrollResponse<T, M>> => {
  return fetchWithConfig<InfiniteScrollResponse<T, M>>(endpoint, config);
};

let isRefreshing = false;

const refreshRequest = async <T>(
  token: string,
  request: (token: string) => Promise<T>,
) => {
  try {
    return await request(token);
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 401) {
      if (!isRefreshing) {
        const store = getDefaultStore();

        try {
          isRefreshing = true;

          const refreshResponse = await refresh();
          const newAccessToken = refreshResponse!.accessToken;

          store.set(accessTokenAtom, newAccessToken);

          return await request(newAccessToken);
        } catch {
          store.set(accessTokenAtom, null);

          window.location.href = '/login';
        } finally {
          isRefreshing = false;
        }
      }
    }

    throw error;
  }
};

export const authApiClient = async <T>(
  endpoint: string,
  token: string,
  config: RequestConfig = {},
) => {
  const request = (accessToken: string) =>
    apiClient<T>(endpoint, {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...config.headers,
      },
    });

  return refreshRequest(token, request);
};

export const authInfiniteApiClient = <T, M = PaginationMeta>(
  endpoint: string,
  token: string,
  config: RequestConfig = {},
) => {
  const request = (accessToken: string) =>
    infiniteApiClient<T, M>(endpoint, {
      ...config,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...config.headers,
      },
    });

  return refreshRequest(token, request);
};
