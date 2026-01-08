import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type ProductStatus = Database['public']['Enums']['product_status'];

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[] | null;
  category_id: string;
  seller_id: string;
  status: ProductStatus;
  views_count: number;
  favorites_count: number;
  delivery_info: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
  } | null;
  seller?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface UseProductsOptions {
  categoryId?: string;
  sellerId?: string;
  status?: ProductStatus;
  search?: string;
  limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { categoryId, sellerId, status = 'active', search, limit = 20 } = options;

  return useQuery({
    queryKey: ['products', { categoryId, sellerId, status, search, limit }],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (sellerId) {
        query = query.eq('seller_id', sellerId);
      }

      if (status) {
        query = query.eq('status', status);
      }

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Fetch seller profiles separately
      const sellerIds = [...new Set(data?.map(p => p.seller_id) || [])];
      const { data: sellers } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', sellerIds);

      const sellersMap = new Map(sellers?.map(s => [s.id, s]) || []);

      return (data || []).map(product => ({
        ...product,
        seller: sellersMap.get(product.seller_id) || null,
      })) as Product[];
    },
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');

      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      // Fetch seller profile
      const { data: seller } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', data.seller_id)
        .single();

      return {
        ...data,
        seller,
      } as Product;
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: {
      title: string;
      description: string;
      price: number;
      category_id: string;
      images?: string[];
      delivery_info?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('products')
        .insert({
          ...product,
          seller_id: user.id,
          status: 'pending' as ProductStatus,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto criado com sucesso!');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      toast.error('Erro ao criar produto');
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Product> & { id: string }) => {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      toast.success('Produto atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Erro ao atualizar produto');
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produto excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast.error('Erro ao excluir produto');
    },
  });
}
