'use client';
import useAuth from '@/app/_hooks/useAuth';
import { LoginData } from '@/interfaces/authInterface';
import { useRef } from 'react';
import Button from '../common/Button';

export default function SignInForm() {
  const { signInQuery } = useAuth();
  const { mutate, isLoading } = signInQuery();
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = emailRef.current?.value ?? '';
    const password = passRef.current?.value ?? '';
    const body: LoginData = {
      email,
      password,
    };

    mutate(body);
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Faça login na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              E-mail
            </label>
            <div className="mt-2">
              <input
                defaultValue={'example@example.com'}
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Senha
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                defaultValue={'StrongP@assw0rd'}
                ref={passRef}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 p-4"
              />
            </div>
          </div>

          <div>
            <Button
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type={'submit'}
              text={'Entrar'}
              loading={isLoading}
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não tem conta?{' '}
          <a
            href="#"
            className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            cadastre-se agora!
          </a>
        </p>
      </div>
    </div>
  );
}
