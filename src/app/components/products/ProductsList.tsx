'use client';

import useProducts from '@/app/_hooks/useProducts';
import ProductItem from './ProductItem';
import { useState, useEffect } from 'react';
import { useSearchContext } from '@/app/_contexts/useSearchContext';

export default function ProductsList() {
  const { searchTerm } = useSearchContext();
  const query = useProducts();
  const [page, setPage] = useState(1);
  const { data, isLoading } = query.getAllProducts(searchTerm, page);

  useEffect(() => {
    setPage((prev) => 1);
  }, [searchTerm]);

  if (isLoading || !data) {
    return <h1>Loading</h1>;
  }

  const isFirsPage = page - 1 < 1;
  const isLastPage = page + 1 > data.totalPages;

  return (
    <div className="my-4">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>

      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => {
            setPage((prev) => page - 1);
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
            setPage((prev) => page + 1);
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
