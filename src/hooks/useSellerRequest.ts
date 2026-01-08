import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from './useAuth';
import type { Database } from '@/integrations/supabase/types';

type SellerRequestStatus = Database['public']['Enums']['seller_request_status'];

export interface SellerRequest {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  cpf: string;
  phone: string;
  products_description: string;
  experience: string | null;
  status: SellerRequestStatus;
  rejection_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export function useSellerRequest() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['seller-request', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('seller_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data as SellerRequest | null;
    },
    enabled: !!user,
  });
}

export function useCreateSellerRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (request: {
      full_name: string;
      email: string;
      cpf: string;
      phone: string;
      products_description: string;
      experience?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('seller_requests')
        .insert({
          ...request,
          user_id: user.id,
          status: 'pending' as SellerRequestStatus,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-request'] });
      toast.success('Solicitação enviada com sucesso!');
    },
    onError: (error) => {
      console.error('Error creating seller request:', error);
      toast.error('Erro ao enviar solicitação');
    },
  });
}

// Admin functions
export function useAllSellerRequests(status?: SellerRequestStatus) {
  return useQuery({
    queryKey: ['seller-requests', status],
    queryFn: async () => {
      let query = supabase
        .from('seller_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as SellerRequest[];
    },
  });
}

export function useReviewSellerRequest() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ 
      id, 
      status, 
      rejection_reason 
    }: { 
      id: string; 
      status: 'approved' | 'rejected'; 
      rejection_reason?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const { data: request, error: fetchError } = await supabase
        .from('seller_requests')
        .select('user_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Update request status
      const { error: updateError } = await supabase
        .from('seller_requests')
        .update({
          status: status as SellerRequestStatus,
          rejection_reason: rejection_reason || null,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (updateError) throw updateError;

      // If approved, add seller role to user
      if (status === 'approved') {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: request.user_id,
            role: 'seller',
          });

        if (roleError && roleError.code !== '23505') {
          // Ignore duplicate key error
          throw roleError;
        }
      }

      return { status };
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['seller-requests'] });
      toast.success(result.status === 'approved' ? 'Vendedor aprovado!' : 'Solicitação rejeitada');
    },
    onError: (error) => {
      console.error('Error reviewing seller request:', error);
      toast.error('Erro ao processar solicitação');
    },
  });
}
