import { supabase } from "@/integrations/supabase/client";

export async function changeUserPassword(
    email: string,
    currentPassword: string,
    newPassword: string
) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
    });

    if (signInError) {
        throw new Error("Senha atual incorreta");
    }

    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (updateError) throw updateError;

    await supabase.auth.signOut({ scope: "global" });
}
