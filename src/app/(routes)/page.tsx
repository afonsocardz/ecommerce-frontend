import Link from 'next/link';
import Button from '../components/common/Button';

export default async function Home() {
  return (
    <Link href={'/products'}>
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        text={'Ver Produtos'}
      />
    </Link>
  );
}
