import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentService } from '../_services/paymentService';
import { toast } from 'react-toastify';
import { NOTIFICATION_MESSAGES } from '@/constants/notificationMessages';
import { useRouter } from 'next/navigation';

export default function usePayment() {
  const client = useQueryClient();
  const navigate = useRouter();
  const useCreatePayment = () =>
    useMutation({
      mutationFn: async (orderId: number) =>
        await paymentService.createPayment(orderId),
      onSuccess: async (data) => {
        toast.success(NOTIFICATION_MESSAGES.success.payment);
        await client.invalidateQueries({ queryKey: ['cart-products'] });
        await client.resetQueries({ queryKey: ['cart-product'] });
        navigate.push(`/products`);
      },
    });
  return { useCreatePayment };
}
