import { api } from '@/config/axiosConfig';
import { PaymentResponse } from '@/interfaces/paymentInterface';

async function createPayment(orderId: number) {
  const { data } = await api.request.post<PaymentResponse>(
    '/payments',
    { orderId },
    { withCredentials: true }
  );
  return data;
}

export const paymentService = { createPayment };
