import { supabase } from '@/integrations/supabase/client';

export async function updateProfile(profile: {
  full_name: string;
  phone: string;
  bibliography: string;
}) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Usuário não autenticado');
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: profile.full_name,
      phone: profile.phone,
      bibliography: profile.bibliography,
    })
    .eq('id', user.id);

  if (error) throw error;
}
