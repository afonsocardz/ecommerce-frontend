'use client';

import useProducts from '@/app/_hooks/useProducts';
import ProductItem from './ProductItem';
import { useSearchParams, useRouter } from 'next/navigation';
import useCartProducts from '@/app/_hooks/useCartProducts';

export default function ProductsList() {
  const navigate = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const pageParam = searchParams.get('page') ?? '1';
  const page = parseInt(pageParam);

  const query = useProducts();
  const { data, isLoading } = query.getAllProducts(search, +page);

  const { getCartProductsQuery } = useCartProducts();
  const getCart = getCartProductsQuery();
  const cartSet = new Set(getCart.data?.map((product) => product.productId));

  if (isLoading || !data) {
    return <h1>Loading</h1>;
  }

  const isFirsPage = page - 1 < 1;
  const isLastPage = page + 1 > data.totalPages;

  return (
    <div className="my-4">
      <ul className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products.map((product) => (
          <ProductItem key={product.id} product={product} cartSet={cartSet} />
        ))}
      </ul>

      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => {
            navigate.push(`/products?search=${search}&page=${page - 1}`);
          }}
          disabled={isFirsPage}
          className={`mr-2 px-3 py-2 bg-gray-300 text-gray-800 rounded`}
        >
          Anterior
        </button>

        <span className="px-3 py-2 bg-gray-300 text-gray-800 rounded">
          {data.currentPage}
        </span>

        <button
          onClick={() => {
            navigate.push(`/products?search=${search}&page=${page + 1}`);
          }}
          disabled={isLastPage}
          className="ml-2 px-3 py-2 bg-gray-300 text-gray-800 rounded"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
