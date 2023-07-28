'use client';

import ProductsList from '@/app/components/products/ProductsList';

const Products = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Lista de Produtos</h1>
      <ProductsList />
    </>
  );
};

export default Products;
