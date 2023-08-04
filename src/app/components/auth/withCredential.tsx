import { useRouter } from 'next/navigation';
import { useAuthContext } from '../../_contexts/AuthContext'; // Supondo que você tenha um contexto de autenticação

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuth = (props: P) => {
    const router = useRouter();
    const { isLogged } = useAuthContext();

    if (!isLogged) {
      router.replace('/sign-in');
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
