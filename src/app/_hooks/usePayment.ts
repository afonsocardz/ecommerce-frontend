import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '../_services/paymentService';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { NOTIFICATION_MESSAGES } from '@/constants/notificationMessages';
import { PaymentResponse } from '@/interfaces/paymentInterface';
import { AxiosError } from 'axios';

export default function usePayment() {
  const client = useQueryClient();
  const navigate = useRouter();
  const useCreatePayment = () =>
    useMutation<PaymentResponse, AxiosError, number>({
      mutationFn: async (orderId: number) =>
        await paymentService.createPayment(orderId),
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ['cart-products'] });
        await client.resetQueries({ queryKey: ['cart-product'] });
        navigate.push(`/products`);
      },
      onError: (error) => {
        if (error.status === 502)
          return toast.error(NOTIFICATION_MESSAGES.error.email);
        toast.error(NOTIFICATION_MESSAGES.error.payment);
      },
    });
  return { useCreatePayment };
}
