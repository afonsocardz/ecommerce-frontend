import Image from 'next/image';
import { ProductResponseData } from '@/interfaces/productInterface';

interface ProductItemProps {
  product: ProductResponseData;
}

export default function ProductItem({
  product,
}: ProductItemProps): React.ReactElement {
  const { imageUrl, name, description, price } = product;
  return (
    <li className="bg-white shadow-md rounded-lg p-4 gap-2 flex flex-col">
      <div className="relative h-64 rounded overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 h-6 truncate">{name}</h2>
        <p className="text-gray-500 mb-4 h-12 overflow-hidden">{description}</p>
        <p className="text-2xl font-semibold mb-4">R${price}</p>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Adicionar ao Carrinho
      </button>
    </li>
  );
}
