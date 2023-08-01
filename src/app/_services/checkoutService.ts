import { api } from '@/config/axiosConfig';
import { Order } from '@/interfaces/checkoutInterface';

async function createCheckout() {
  return (
    await api.request.post<{ id: number }>(
      '/orders',
      {},
      { withCredentials: true }
    )
  ).data;
}

async function getCheckout(orderId: number) {
  const { data } = await api.request.get<Order>('/orders/' + orderId, {
    withCredentials: true,
  });
  return data;
}

export const checkoutService = { createCheckout, getCheckout };
