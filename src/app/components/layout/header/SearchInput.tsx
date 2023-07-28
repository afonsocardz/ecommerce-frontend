import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function SearchInput() {
  const { push: navigate } = useRouter();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    navigate(`/products?search=${searchTerm}`);
  }
  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-4">
      <button className="bg-white rounded-full p-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
      </button>
      <input
        name="search"
        type="text"
        placeholder="Pesquisar produtos..."
        className="border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
      />
    </form>
  );
}
