import { useQuery } from '@tanstack/react-query';
import { productsService } from '../_services/productsServices';
import { ProductsResponse } from '@/interfaces/productInterface';

export default function useProducts() {
  const getAllProducts = (search: string, page?: number) =>
    useQuery<ProductsResponse>({
      queryKey: ['products', { search, page }],
      queryFn: async () => await productsService.getAllProducts(search, page),
    });

  return { getAllProducts };
}
