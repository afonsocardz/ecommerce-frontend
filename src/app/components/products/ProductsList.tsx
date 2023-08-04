'use client';

import useProducts from '@/app/_hooks/useProducts';
import ProductItem from './ProductItem';
import { useSearchParams, useRouter } from 'next/navigation';
import useCartProducts from '@/app/_hooks/useCartProducts';
import SignInAlertModal from '../modal/SignInAlertModal';
import useDisclosure from '@/app/_hooks/useDisclosure';

export default function ProductsList() {
  const navigate = useRouter();
  const searchParams = useSearchParams();

  const openModal = useDisclosure();

  const search = searchParams.get('search') ?? '';
  const pageParam = searchParams.get('page') ?? '1';
  const page = parseInt(pageParam);

  const query = useProducts();
  const { data, isLoading } = query.useGetAllProducts(search, +page);

  const { useGetCartProductsQuery } = useCartProducts();
  const getCart = useGetCartProductsQuery();
  const cartSet = new Set(getCart.data?.map((product) => product.productId));

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (data.products.length === 0) {
    return <h1>Nenhum produto encontrado!</h1>;
  }

  const isFirsPage = page - 1 < 1;
  const isLastPage = page + 1 > data.totalPages;

  return (
    <div className="my-4">
      <SignInAlertModal {...openModal} />
      <ul className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            cartSet={cartSet}
            setModal={openModal.setOpen}
          />
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
