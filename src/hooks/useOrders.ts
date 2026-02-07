import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type OrderStatus = Database['public']['Enums']['order_status'];

export interface Order {
  id: string;
  order_number: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  platform_fee: number;
  seller_amount: number;
  status: OrderStatus;
  delivery_data: string | null;
  confirmed_at: string | null;
  security_period_ends_at: string | null;
  created_at: string;
  updated_at: string;
  product?: {
    id: string;
    title: string;
    images: string[] | null;
    price: number;
  } | null;
  buyer?: {
    id: string;
    full_name: string | null;
    email: string;
  } | null;
  seller?: {
    id: string;
    full_name: string | null;
  } | null;
}

interface UseOrdersOptions {
  buyerId?: string;
  sellerId?: string;
  status?: OrderStatus;
}

export function useOrders(options: UseOrdersOptions = {}) {
  const { buyerId, sellerId, status } = options;

  return useQuery({
    queryKey: ['orders', { buyerId, sellerId, status }],
    queryFn: async () => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          product:products(id, title, images, price)
        `)
        .order('created_at', { ascending: false });

      if (buyerId) {
        query = query.eq('buyer_id', buyerId);
      }

      if (sellerId) {
        query = query.eq('seller_id', sellerId);
      }

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch buyer and seller profiles separately
      const buyerIds = [...new Set(data?.map(o => o.buyer_id) || [])];
      const sellerIds = [...new Set(data?.map(o => o.seller_id) || [])];
      const allUserIds = [...new Set([...buyerIds, ...sellerIds])];

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', allUserIds);

      const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

      return (data || []).map(order => ({
        ...order,
        buyer: profilesMap.get(order.buyer_id) || null,
        seller: profilesMap.get(order.seller_id) || null,
      })) as Order[];
    },
  });
}

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      if (!id) throw new Error('Order ID is required');

      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          product:products(id, title, images, price, delivery_info)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Fetch buyer and seller profiles
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', [data.buyer_id, data.seller_id]);

      const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

      return {
        ...data,
        buyer: profilesMap.get(data.buyer_id) || null,
        seller: profilesMap.get(data.seller_id) || null,
      } as Order;
    },
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (order: {
      product_id: string;
      seller_id: string;
      amount: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const platformFee = order.amount * 0.10; // 10% platform fee
      const sellerAmount = order.amount - platformFee;

      const { data, error } = await supabase
        .from('orders')
        .insert({
          ...order,
          buyer_id: user.id,
          platform_fee: platformFee,
          seller_amount: sellerAmount,
          status: 'pending' as OrderStatus,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido criado com sucesso!');
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      toast.error('Erro ao criar pedido');
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, delivery_data }: { 
      id: string; 
      status: OrderStatus; 
      delivery_data?: string;
    }) => {
      const updates: Record<string, unknown> = { status };
      
      if (status === 'awaiting_confirmation') {
        updates.delivery_data = delivery_data;
      }
      
      if (status === 'completed') {
        updates.confirmed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', data.id] });
      toast.success('Status do pedido atualizado!');
    },
    onError: (error) => {
      console.error('Error updating order status:', error);
      toast.error('Erro ao atualizar status do pedido');
    },
  });
}
