'use client';
import React, { createContext, useContext, useState } from 'react';

interface InitialContextValue {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext({} as InitialContextValue);

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
