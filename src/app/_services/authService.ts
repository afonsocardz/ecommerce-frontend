import { api } from '@/config/axiosConfig';
import { cache } from 'react';

const signIn = cache(async (email: string, password: string) => {
  await api.request.post(
    '/auth/login',
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
});

const logout = cache(
  async () => await api.request.get('/auth/logout', { withCredentials: true })
);

export const authService = {
  signIn,
  logout,
};
