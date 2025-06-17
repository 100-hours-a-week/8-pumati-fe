import { AuthData } from '@/features/user/schemas';
import { apiClient, authApiClient } from '@/utils/api-client';
import { ApiError } from '@/utils/error';
import {
  LoginProvider,
  NonTraineeSignupData,
  RefreshResponse,
  SignupData,
  SignupResponse,
  TeamList,
} from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginWithProvider = async (provider: LoginProvider) => {
  window.location.href = `${BASE_URL}/api/oauth/${provider}/redirection`;
};

export const logout = async () => {
  return apiClient('/api/auth/tokens', {
    method: 'DELETE',
    credentials: 'include',
  });
};

export const getMe = async (token: string) => {
  return authApiClient<AuthData>('/api/members/me', token).then(
    (res) => res.data,
  );
};

export const getTeamList = async () => {
  return apiClient<TeamList>('/api/teams').then((res) => res.data);
};

export const signup = async (signupData: SignupData | NonTraineeSignupData) => {
  return apiClient<SignupResponse>('/api/members/social', {
    method: 'POST',
    credentials: 'include',
    body: signupData,
  }).then((res) => res.data);
};

export const refresh = async () => {
  try {
    const response = await apiClient<RefreshResponse>('/api/auth/tokens', {
      method: 'PUT',
      credentials: 'include',
    });

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.statusCode === 400) {
        return undefined;
      }
    }

    throw error;
  }
};
