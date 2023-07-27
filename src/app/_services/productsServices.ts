import { api } from '@/config/axiosConfig';
import { ProductsResponse } from '@/interfaces/productInterface';
import { cache } from 'react';

const getAllProducts = cache(async (search: string, page?: number) => {
  const res = await api.request.get<ProductsResponse>('/products', {
    params: {
      search,
      page,
    },
  });
  return res.data;
});

export const productsService = {
  getAllProducts,
};
