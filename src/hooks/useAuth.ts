import { useQuery, useMutation, useQueryClient } from 'react-query';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery(
    'currentUser',
    () => authService.getCurrentUser(),
    {
      retry: false,
      onError: () => {
        // Handle unauthorized access
        authService.logout();
      },
    }
  );

  const loginMutation = useMutation(authService.login, {
    onSuccess: (data) => {
      queryClient.setQueryData('currentUser', data.user);
      navigate('/dashboard');
    },
  });

  const registerMutation = useMutation(authService.register, {
    onSuccess: () => {
      navigate('/login');
    },
  });

  const logout = () => {
    authService.logout();
    queryClient.clear();
    navigate('/login');
  };

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isAuthenticated: !!user,
  };
}