'use client';

import useCheckout from '@/app/_hooks/useCheckout';
import CheckoutForm from '@/app/components/checkout/CheckoutForm';
import { PaymentStatus } from '@/interfaces/checkoutInterface';

interface CheckoutProps {
  params: {
    id: string;
  };
}

export default function Checkout({ params }: CheckoutProps) {
  const { data, isLoading } = useCheckout().getCheckout(+params.id);

  if (isLoading) {
    return <p>Loading Checkout</p>;
  }

  console.log(data);

  if (data.status === PaymentStatus.COMPLETED) {
    return <p>Esse pedido já foi concluído!</p>;
  }

  return <CheckoutForm {...{ data }} />;
}
