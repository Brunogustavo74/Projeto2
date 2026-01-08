import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from './useAuth';

export interface SellerBalance {
  id: string;
  seller_id: string;
  available_balance: number;
  blocked_balance: number;
  total_earned: number;
  total_withdrawn: number;
  created_at: string;
  updated_at: string;
}

export interface WithdrawalRequest {
  id: string;
  seller_id: string;
  amount: number;
  pix_key: string;
  status: string;
  rejection_reason: string | null;
  processed_at: string | null;
  processed_by: string | null;
  created_at: string;
}

export function useSellerBalance() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['seller-balance', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('seller_balances')
        .select('*')
        .eq('seller_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No balance found, return default
          return {
            available_balance: 0,
            blocked_balance: 0,
            total_earned: 0,
            total_withdrawn: 0,
          } as SellerBalance;
        }
        throw error;
      }
      return data as SellerBalance;
    },
    enabled: !!user,
  });
}

export function useWithdrawalRequests() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['withdrawal-requests', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('withdrawal_requests')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WithdrawalRequest[];
    },
    enabled: !!user,
  });
}

export function useRequestWithdrawal() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ amount, pix_key }: { amount: number; pix_key: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('withdrawal_requests')
        .insert({
          seller_id: user.id,
          amount,
          pix_key,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawal-requests'] });
      queryClient.invalidateQueries({ queryKey: ['seller-balance'] });
      toast.success('Solicitação de saque enviada!');
    },
    onError: (error) => {
      console.error('Error requesting withdrawal:', error);
      toast.error('Erro ao solicitar saque');
    },
  });
}
