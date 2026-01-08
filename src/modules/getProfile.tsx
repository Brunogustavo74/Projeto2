import { supabase } from '@/integrations/supabase/client';

export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, phone, bibliography')
    .eq('id', user.id)
    .single();

  if (error) throw error;

  return data;
}
