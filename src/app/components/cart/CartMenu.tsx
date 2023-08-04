'use client';
import React, { Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DisclosureHook } from '@/app/_hooks/useDisclosure';
import { useCartContext } from '@/app/_contexts/CartContext';
import useCartProducts from '@/app/_hooks/useCartProducts';
import { CartProductResponseData } from '@/interfaces/cartProductInterface';
import useCheckout from '@/app/_hooks/useCheckout';

export default function CartMenu({
  open,
  setOpen,
}: DisclosureHook): React.ReactElement {
  const { getCart } = useCartContext();
  const cart = getCart.data ?? [];

  const subtotals = cart.map<number>((item) => item.subtotal);
  const subtotal =
    subtotals.length === 0 ? 0 : subtotals.reduce((prev, curr) => prev + curr);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {cart.length > 0 ? 'Carrinho' : 'Carrinho vazio'}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Fechar</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <CartProductList {...{ cart }} />
                    </div>
                    {cart.length > 0 && (
                      <CartCheckoutInfo {...{ subtotal, setOpen }} />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

interface CartProductListProps {
  cart: CartProductResponseData[];
}

function CartProductList({ cart }: CartProductListProps) {
  const { useRemoveProductQuery } = useCartProducts();
  const removeProduct = useRemoveProductQuery();
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.map(({ Product: product, quantity, id }) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                  src={product.imageUrl}
                  alt={product.description}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{product.name}</a>
                    </h3>
                    <p className="ml-4">R${product.price}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">X {quantity}</p>

                  <div className="flex">
                    <button
                      onClick={() => removeProduct.mutate(id)}
                      type="button"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface CartCheckoutInfoProps {
  subtotal: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CartCheckoutInfo({ subtotal, setOpen }: CartCheckoutInfoProps) {
  const { useCreateCheckout } = useCheckout();
  const { mutate } = useCreateCheckout();

  function onCreateOrder() {
    mutate();
    setOpen(false);
  }
  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p>R${subtotal}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Frete será calculado no checkout
      </p>
      <div className="mt-6">
        <button
          onClick={onCreateOrder}
          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          ou{' '}
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={() => setOpen(false)}
          >
            Continuar comprando
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
}
