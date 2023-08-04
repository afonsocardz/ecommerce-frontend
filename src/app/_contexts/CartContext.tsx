'use client';
import { ReactNode, createContext, useContext } from 'react';
import useCartProducts from '../_hooks/useCartProducts';
import { UseQueryResult } from '@tanstack/react-query';
import { CartProductResponseData } from '@/interfaces/cartProductInterface';

interface InitialContext {
  getCart: UseQueryResult<CartProductResponseData[], unknown>;
  cartSet: Set<number>;
}

const CartContext = createContext({} as InitialContext);

export const useCartContext = () => useContext(CartContext);

export default function CartProvider({ children }: { children: ReactNode }) {
  const { useGetCartProductsQuery } = useCartProducts();
  const getCart = useGetCartProductsQuery();

  const cartSet = new Set(getCart.data?.map((product) => product.productId));

  return (
    <CartContext.Provider value={{ getCart, cartSet }}>
      {children}
    </CartContext.Provider>
  );
}
