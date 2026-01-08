import { supabase } from '@/integrations/supabase/client';

type UserRole = 'buyer' | 'seller';

export async function registerUser(
  email: string,
  password: string,
  fullName: string,
  phone: string,
  role: UserRole
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
      },
    },
  });

  if (error) throw error;
  if (!data.user) throw new Error('Falha ao criar usuário');

  const userId = data.user.id;

  if (role === 'seller') {
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'seller',
      });

    if (roleError) throw roleError;
  }

  return data.user;
}
