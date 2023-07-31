import { Product } from './productInterface';

export interface CartProductResponseData {
  id: number;
  quantity: number;
  productId: number;
  subtotal: number;
  Product: Product;
}

export interface AddCartProductBody {
  quantity: number;
  productId: number;
}
