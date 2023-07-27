'use client';
import { useState } from 'react';

import useCartProducts from '@/app/_hooks/useCartProducts';
import { ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAuthContext } from '@/app/_contexts/AuthContext';
import SlideMenu from './SlideMenu';
import SearchInput from '../SearchInput';
import useDisclosure from '@/app/_hooks/useDisclosure';

export default function Header() {
  const { isLogged } = useAuthContext();
  const disclosure = useDisclosure();
  const query = useCartProducts();
  const { data } = query.getCartProductsQuery();
  const cartItemCount = data ? data.length : 0;

  return (
    <header className="bg-blue-500 py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-white text-2xl font-bold">Minha Loja</h1>
        <div className="bg-white text-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
          <ShoppingCartIcon className="h-6 w-6" />
        </div>
        <span className="text-white">{cartItemCount}</span>
      </div>
      <div className="hidden md:block lg:block">
        <SearchInput />
      </div>

      <button
        className="lg:hidden md:hidden text-white"
        onClick={() => disclosure.setOpen(!disclosure.open)}
      >
        <Bars3Icon className="h-6 w-6" />
        <SlideMenu {...disclosure} />
      </button>

      <div className="hidden md:block lg:block space-x-4">
        {isLogged ? (
          <button className="bg-white text-blue-500 px-4 py-2 rounded-lg">
            Logout
          </button>
        ) : (
          <>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg">
              Login
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Cadastro
            </button>
          </>
        )}
      </div>
    </header>
  );
}
