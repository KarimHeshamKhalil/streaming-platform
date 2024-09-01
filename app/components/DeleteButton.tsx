'use client'
import { createClient } from '@/lib/utils/client';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoMdTrash } from "react-icons/io";

interface ButtonProps {
  programId: string,
  userId: string,
}

export default function DeleteButton({ programId, userId }: ButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    const supabase = createClient()
    const { error } = await supabase.from('watch_later').delete().eq('user_id', userId).eq('program_id', programId)

    if (error) {
      console.log(error)
    }

    router.refresh()
  }
  return (
    <button onClick={handleDelete} className='absolute top-2 right-2 text-lg px-2 py-1 rounded-full bg-red-100 text-red-900 hidden group-hover:block'>
      <IoMdTrash />
    </button>
  )
}
