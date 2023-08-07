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

export async function removeCartProduct(productId: number) {
  return await api.request.delete(`/cart-products/${productId}`, {
    withCredentials: true,
  });
}

export async function updateCartQty(quantity: number, productId: number) {
  return await api.request.patch(
    `/cart-products/${productId}`,
    { quantity },
    { withCredentials: true }
  );
}

export async function getCartProduct(productId: number) {
  return (
    await api.request.get<CartProductResponseData>(
      `/cart-products/${productId}`,
      {
        withCredentials: true,
      }
    )
  ).data;
}
