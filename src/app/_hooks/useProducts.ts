import { useQuery } from '@tanstack/react-query';
import { productsService } from '../_services/productsServices';
import { ProductsResponse } from '@/interfaces/productInterface';

const initialProducts: ProductsResponse = {
  currentPage: 1,
  totalPages: 1,
  products: [],
};

export default function useProducts() {
  const getAllProducts = (search: string, page?: number) =>
    useQuery<ProductsResponse>({
      queryKey: ['products', { search, page }],
      queryFn: async () => await productsService.getAllProducts(search, page),
      suspense: true,
      initialData: () => initialProducts,
      staleTime: 0,
    });

  return { getAllProducts };
}
