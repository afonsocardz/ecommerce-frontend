'use client';

import useCartProducts from '@/app/_hooks/useCartProducts';
import { CartProductResponseData } from '@/interfaces/cartProductInterface';

interface ProductQtyButtonsProps {
  cartItem: CartProductResponseData;
}

export default function ProductQtyButtons({
  cartItem,
}: ProductQtyButtonsProps) {
  const { updateProductQtyQuery, removeProductQuery } = useCartProducts();

  const updateCart = updateProductQtyQuery(cartItem.id);

  const removeCart = removeProductQuery();

  const handleAdd = () => {
    updateCart.mutate(cartItem.quantity + 1);
  };

  const handleRemove = () => {
    if (cartItem.quantity - 1 === 0) {
      removeCart.mutate(cartItem.id);
    } else {
      updateCart.mutate(cartItem.quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={handleRemove}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        -
      </button>
      <span className="text-xl font-bold">{cartItem.quantity}</span>
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        +
      </button>
    </div>
  );
}
