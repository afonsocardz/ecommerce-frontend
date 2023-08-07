import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  addCartProduct,
  getCartProduct,
  getCartProducts,
  removeCartProduct,
  updateCartQty,
} from '../_services/cartProductsService';
import {
  AddCartProductBody,
  CartProductResponseData,
} from '@/interfaces/cartProductInterface';
import { NOTIFICATION_MESSAGES } from '@/constants/notificationMessages';

export default function useCartProducts() {
  const client = useQueryClient();
  const useGetCartProductsQuery = () =>
    useQuery({
      queryKey: ['cart-products'],
      queryFn: async () => {
        const cartProducts = await getCartProducts();

        cartProducts.forEach((item) => {
          client.setQueryData<CartProductResponseData>(
            ['cart-product', item.productId],
            item
          );
        });

        return cartProducts;
      },
    });

  const useAddCartProductQuery = () =>
    useMutation({
      mutationFn: async (body: AddCartProductBody) =>
        await addCartProduct(body),
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ['cart-products'] });
        toast.success(NOTIFICATION_MESSAGES.success.addProduct);
      },
    });

  const useRemoveProductQuery = () =>
    useMutation({
      mutationFn: async (productId: number) =>
        await removeCartProduct(productId),
      onMutate: (productId) => {
        const prevData = client.getQueryData<CartProductResponseData>([
          'cart-product',
          productId,
        ]);

        const prevArray = client.getQueryData<CartProductResponseData[]>([
          'cart-products',
        ]);

        client.setQueryData(['cart-product', productId], null);
        client.setQueryData<CartProductResponseData[]>(
          ['cart-products'],
          (prev) => {
            if (prev !== undefined)
              return prev.filter((item) => item.productId !== productId);
          }
        );

        return { prevData, prevArray };
      },
      onError: (err, variable, context) => {
        if (context) {
          const { prevArray, prevData } = context;
          if (prevData) {
            client.setQueryData(['cart-product', prevData.productId], prevData);
          }
          if (prevArray) {
            client.setQueryData<CartProductResponseData[]>(
              ['cart-products'],
              prevArray
            );
          }
        }
      },
    });

  const useUpdateProductQtyQuery = (productId: number) =>
    useMutation({
      mutationFn: async (quantity: number) => {
        updateCartQty(quantity, productId);
      },
      onMutate: (quantity: number) => {
        const previousData = client.getQueryData<CartProductResponseData>([
          'cart-product',
          productId,
        ]);

        const updated = client.setQueryData<CartProductResponseData>(
          ['cart-product', productId],
          (prev) => {
            if (prev) {
              return {
                ...prev,
                quantity,
                subtotal: prev?.Product.price * quantity,
              } as CartProductResponseData;
            }
          }
        );

        console.log(updated);
        return previousData;
      },
      onError: (err, variable, context) => {
        if (context) {
          client.setQueryData(['cart-product', context.id], context);
        }
      },
    });

  const useGetCartProduct = (productId: number) =>
    useQuery({
      queryKey: ['cart-product', productId],
      queryFn: async () => await getCartProduct(productId),
      enabled: false,
    });

  return {
    useGetCartProductsQuery,
    useAddCartProductQuery,
    useRemoveProductQuery,
    useUpdateProductQtyQuery,
    useGetCartProduct,
  };
}
