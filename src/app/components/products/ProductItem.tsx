'use client';
import Image from 'next/image';
import useCartProducts from '@/app/_hooks/useCartProducts';
import Button from '../common/Button';
import { Product } from '@/interfaces/productInterface';
import { useCartContext } from '@/app/_contexts/CartContext';
import ProductQtyButtons from './ProductQtyButtons';

interface ProductItemProps {
  product: Product;
  cartSet: Set<number>;
}

export default function ProductItem({
  product,
  cartSet,
}: ProductItemProps): React.ReactElement {
  const { imageUrl, name, description, price, id } = product;

  const { getCart } = useCartContext();
  const cartData = getCart.data ?? [];
  const cart = cartData.find((cart) => cart.productId === id);

  const { addCartProductQuery } = useCartProducts();
  const addCart = addCartProductQuery();

  const isProductInCart = cartSet.has(id);

  function onClickAddButton() {
    addCart.mutate({ productId: id, quantity: 1 });
  }

  return (
    <li className="bg-white shadow-md rounded-lg p-4 gap-2 flex flex-col">
      <div className="relative h-64 rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 h-6 truncate">{name}</h2>
        <p className="text-gray-500 mb-4 h-12 overflow-hidden">{description}</p>
        <p className="text-2xl font-semibold mb-4">R${price}</p>
      </div>
      {isProductInCart && cart !== undefined ? (
        <ProductQtyButtons cartItem={cart} />
      ) : (
        <Button
          className={`${
            isProductInCart ? 'bg-red-500' : 'bg-blue-500'
          } text-white px-4 py-2 rounded-md`}
          text={'Adicionar ao Carrinho'}
          onClick={onClickAddButton}
          loading={addCart.isLoading}
        />
      )}
    </li>
  );
}
