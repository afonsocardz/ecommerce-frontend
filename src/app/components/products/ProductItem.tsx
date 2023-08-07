'use client';
import Image from 'next/image';
import useCartProducts from '@/app/_hooks/useCartProducts';
import Button from '../common/Button';
import { Product } from '@/interfaces/productInterface';
import ProductQtyButtons from './ProductQtyButtons';
import { Dispatch, SetStateAction } from 'react';
import { useAuthContext } from '@/app/_contexts/AuthContext';

interface ProductItemProps {
  product: Product;
  setModal: Dispatch<SetStateAction<boolean>>;
}

export default function ProductItem({
  product,
  setModal,
}: ProductItemProps): React.ReactElement {
  const { imageUrl, name, description, price, id } = product;

  const { isLogged } = useAuthContext();

  const { useAddCartProductQuery, useGetCartProduct } = useCartProducts();
  const addCart = useAddCartProductQuery();

  const cartProduct = useGetCartProduct(id);

  const isProductInCart = !!cartProduct.data;

  function onClickAddButton() {
    addCart.mutate({ productId: id, quantity: 1 });
  }

  function onClickOpenModal() {
    setModal(true);
  }

  return (
    <li className="bg-white shadow-md rounded-lg p-4 gap-2 flex flex-col">
      <div className="relative h-64 rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded object-cover"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 h-6 truncate">{name}</h2>
        <p className="text-gray-500 mb-4 h-12 overflow-hidden">{description}</p>
        <p className="text-2xl font-semibold mb-4">R${price}</p>
      </div>
      {isProductInCart && cartProduct.data !== undefined ? (
        <ProductQtyButtons cartItem={cartProduct.data} />
      ) : (
        <Button
          className={`${
            isProductInCart ? 'bg-red-500' : 'bg-blue-500'
          } text-white px-4 py-2 rounded-md`}
          text={'Adicionar ao Carrinho'}
          onClick={isLogged ? onClickAddButton : onClickOpenModal}
          loading={addCart.isLoading}
        />
      )}
    </li>
  );
}
