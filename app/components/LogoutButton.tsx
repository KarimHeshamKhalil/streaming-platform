'use client'
import { createClient } from '@/lib/utils/client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogOut = async () => {
    const supabase = createClient()

    const {error} = await supabase.auth.signOut()

    if (error) {
      console.log(error)
      return
    }

    router.replace('/discover')
  }

  return (
    <button onClick={handleLogOut} className='px-6 py-1 text-slate-100 bg-red-600 rounded-sm shadow-sm hover:rotate-2 hover:shadow-md transition-all duration-200 ease-in-out'>
      Log out
    </button>
  )
}
