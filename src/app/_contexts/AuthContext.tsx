'use client';
import { api } from '@/config/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react';

interface InitialContextValue {
  isLogged: boolean;
}

const AuthContext = createContext({} as InitialContextValue);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useQuery<boolean>({
    queryKey: ['status'],
    queryFn: async () => {
      try {
        const { status } = await api.request('auth/status', {
          withCredentials: true,
        });
        return status === 200;
      } catch (error) {
        return false;
      }
    },
  });

  const isLogged = data !== undefined ? data : false;

  console.log(isLogged);

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  );
};
