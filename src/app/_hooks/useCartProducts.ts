import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  addCartProduct,
  getCartProducts,
  removeCartProduct,
  updateCartQty,
} from '../_services/cartProductsService';
import { AddCartProductBody } from '@/interfaces/cartProductInterface';
import { NOTIFICATION_MESSAGES } from '@/constants/notificationMessages';

export default function useCartProducts() {
  const client = useQueryClient();
  const getCartProductsQuery = () =>
    useQuery({
      queryKey: ['cart-products'],
      queryFn: async () => await getCartProducts(),
    });

  const addCartProductQuery = () =>
    useMutation({
      mutationFn: async (body: AddCartProductBody) =>
        await addCartProduct(body),
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ['cart-products'] });
        toast.success(NOTIFICATION_MESSAGES.success.addProduct);
      },
    });

  const removeProductQuery = () =>
    useMutation({
      mutationFn: async (cartProductId: number) =>
        await removeCartProduct(cartProductId),
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ['cart-products'] });
      },
    });

  const updateProductQtyQuery = (cartId: number) =>
    useMutation({
      mutationFn: async (quantity: number) =>
        await updateCartQty(quantity, cartId),
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ['cart-products'] });
      },
    });
  return {
    getCartProductsQuery,
    addCartProductQuery,
    removeProductQuery,
    updateProductQtyQuery,
  };
}
