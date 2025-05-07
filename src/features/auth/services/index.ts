import { LoginProvider } from '../schemas';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginWithProvider = async (provider: LoginProvider) => {
  window.location.href = `${BASE_URL}/api/oauth/${provider}/redirection`;
};
