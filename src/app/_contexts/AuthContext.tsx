'use client';
import { api } from '@/config/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

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
      const { status } = await api.request('auth/status', {
        withCredentials: true,
      });
      return status === 200;
    },
  });

  const isLogged = !data ? false : data;

  return (
    <AuthContext.Provider value={{ isLogged }}>{children}</AuthContext.Provider>
  );
};
