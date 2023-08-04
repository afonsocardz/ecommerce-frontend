import { useMutation, useQuery } from '@tanstack/react-query';
import { checkoutService } from '../_services/checkoutService';
import { useRouter } from 'next/navigation';
import { Order, PaymentStatus } from '@/interfaces/checkoutInterface';

const initialCheckout: Order = {
  id: 0,
  totalAmount: 0,
  status: PaymentStatus.PENDING,
  OrderProduct: [],
};

export default function useCheckout() {
  const navigate = useRouter();
  const useCreateCheckout = () =>
    useMutation({
      mutationFn: async () => await checkoutService.createCheckout(),
      onSuccess: (data) => {
        navigate.push('/checkout/' + data.id);
      },
    });

  const useGetCheckout = (orderId: number) =>
    useQuery({
      queryKey: ['order', orderId],
      queryFn: async () => await checkoutService.getCheckout(orderId),
      initialData: () => initialCheckout,
      staleTime: 0,
      suspense: true,
    });
  return { useCreateCheckout, useGetCheckout };
}
