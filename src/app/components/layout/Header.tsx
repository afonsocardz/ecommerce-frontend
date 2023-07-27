'use client';
import { useSearchContext } from '@/app/_contexts/useSearchContext';
import useCartProducts from '@/app/_hooks/useCartProducts';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon as SearchIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
  const query = useCartProducts();
  const { data } = query.getCartProductsQuery();
  const cartItemCount = data ? data.length : 0;

  const { setSearchTerm } = useSearchContext();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    setSearchTerm(searchTerm);
  }

  return (
    <header className="bg-blue-500 py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-white text-2xl font-bold">Minha Loja</h1>
        <div className="bg-white text-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
          <ShoppingCartIcon className="h-6 w-6" />
        </div>
        <span className="text-white">{cartItemCount}</span>
      </div>
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <button className="bg-white rounded-full p-1">
          <SearchIcon className="h-6 w-6 text-blue-500" />
        </button>
        <input
          name="search"
          type="text"
          placeholder="Pesquisar produtos..."
          className="border rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        />
      </form>
      <div className="space-x-4">
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg">
          Login
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Cadastro
        </button>
      </div>
    </header>
  );
}
