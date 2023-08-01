import { Product } from './productInterface';

export enum PaymentStatus {
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',
  DELIVERY = 'DELIVERY',
  PAYED = 'PAYED',
  COMPLETED = 'COMPLETED',
}

interface OrderProduct {
  id: number;
  quantity: number;
  subtotal: number;
  orderId: number;
  productId: number;
  Product: Product;
}

export interface Order {
  id: number;
  totalAmount: number;
  status: PaymentStatus;
  OrderProduct: OrderProduct[];
}
