export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface ProductsResponse {
  totalPages: number;
  currentPage: number;
  products: Product[];
}
