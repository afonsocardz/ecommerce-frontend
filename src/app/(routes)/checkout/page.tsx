'use client';

import { redirect } from 'next/navigation';

export default function CheckoutPage() {
  redirect('/products');
  return <></>;
}
