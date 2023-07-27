import { useQuery } from '@tanstack/react-query';
import { productsService } from '../_services/productsServices';

export default function useProducts() {
  const getAllProducts = (search: string, page?: number) =>
    useQuery({
      queryKey: ['products', { search, page }],
      queryFn: async () => await productsService.getAllProducts(search, page),
    });

  return { getAllProducts };
}
