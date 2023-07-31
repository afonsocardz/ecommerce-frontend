'use client';

import useCartProducts from '@/app/_hooks/useCartProducts';
import { ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAuthContext } from '@/app/_contexts/AuthContext';
import SlideMenu from './SlideMenu';
import SearchInput from './SearchInput';
import useDisclosure from '@/app/_hooks/useDisclosure';
import Link from 'next/link';
import Button from '../../common/Button';
import useAuth from '@/app/_hooks/useAuth';
import { useCartContext } from '@/app/_contexts/CartContext';
import CartMenu from '../../cart/CartMenu';

export default function Header() {
  const { isLogged } = useAuthContext();
  const disclosure = useDisclosure();
  const openCartMenu = useDisclosure();

  const { data } = useCartContext().getCart;
  const cartItemCount = data ? data.length : 0;

  const { mutate } = useAuth().logoutQuery();

  function onClickLogout(): void {
    mutate();
  }

  return (
    <header className="bg-blue-500 py-4 px-8 flex w-full items-center justify-between fixed z-10">
      <div className="flex items-center space-x-4">
        <Link href={'/'}>
          <h1 className="text-white text-2xl font-bold">Minha Loja</h1>
        </Link>
        {isLogged && (
          <>
            <button
              onClick={() => openCartMenu.setOpen(!openCartMenu.open)}
              className="bg-white text-blue-500 rounded-full h-8 w-8 flex items-center justify-center"
            >
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            <span className="text-white">{cartItemCount}</span>
            <CartMenu {...openCartMenu} />
          </>
        )}
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

      <div className="hidden md:flex lg:flex gap-4">
        {isLogged ? (
          <Button
            className="bg-white text-blue-500 px-4 py-2 rounded-lg"
            text={'Logout'}
            onClick={onClickLogout}
          />
        ) : (
          <>
            <Link href={'/sign-in'}>
              <Button
                className="bg-white text-blue-500 px-4 py-2 rounded-lg"
                text={'Login'}
              />
            </Link>
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-blue-500"
              text={'Cadastro'}
            />
          </>
        )}
      </div>
    </header>
  );
}
