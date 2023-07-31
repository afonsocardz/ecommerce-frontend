import { api } from '@/config/axiosConfig';
import {
  AddCartProductBody,
  CartProductResponseData,
} from '@/interfaces/cartProductInterface';

export async function getCartProducts(): Promise<CartProductResponseData[]> {
  return (
    await api.request.get<CartProductResponseData[]>('/cart-products', {
      withCredentials: true,
    })
  ).data;
}

export async function addCartProduct(body: AddCartProductBody) {
  return (
    await api.request.post('/cart-products', body, {
      withCredentials: true,
    })
  ).data;
}

export async function removeCartProduct(cartProductId: number) {
  return await api.request.delete(`/cart-products/${cartProductId}`, {
    withCredentials: true,
  });
}

export async function updateCartQty(quantity: number, cartId: number) {
  return await api.request.patch(
    `/cart-products/${cartId}`,
    { quantity },
    { withCredentials: true }
  );
}
