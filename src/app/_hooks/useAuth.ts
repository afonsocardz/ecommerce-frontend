import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../_services/authService';
import { LoginData } from '@/interfaces/authInterface';
import { toast } from 'react-toastify';
import { NOTIFICATION_MESSAGES } from '@/constants/notificationMessages';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const { push: navigate } = useRouter();
  const client = useQueryClient();

  const useSignInQuery = () =>
    useMutation({
      mutationFn: async ({ email, password }: LoginData) =>
        await authService.signIn(email, password),
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ['status'] });
        navigate('/products');
        toast.success(NOTIFICATION_MESSAGES.success.login);
      },
      onError: () => {
        toast.error(NOTIFICATION_MESSAGES.error.login);
      },
    });

  const useLogoutQuery = () =>
    useMutation({
      mutationFn: async () => await authService.logout(),
      onSuccess: async () => {
        await client.invalidateQueries({ queryKey: ['status'] });
        client.clear();
        navigate('/');
        toast.success(NOTIFICATION_MESSAGES.success.logout);
      },
    });

  return {
    useLogoutQuery,
    useSignInQuery,
  };
}
