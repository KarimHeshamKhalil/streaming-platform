'use server'

import { createClient } from "@/lib/utils/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"


export async function signup(formData: FormData): Promise<{ success: true } | { success: false; error: string }> {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  redirect('/discover')
  

  return {success: true}
}