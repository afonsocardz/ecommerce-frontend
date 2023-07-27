import ProductsList from './components/products/ProductsList';

export default async function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Lista de Produtos</h1>
      <ProductsList />
    </div>
  );
}
