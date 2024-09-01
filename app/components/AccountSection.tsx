'use client'
import { createClient } from '@/lib/utils/client'
import React, { useEffect, useState } from 'react'

export default function AccountSection() {
  const [hasAccount, setHasAccount] = useState(false)

  const handleLogOut = async () => {
    const supabase = createClient()

    const {error} = await supabase.auth.signOut()

    if (error) {
      console.log(error)
      return
    }

    setHasAccount(false)
  }

  useEffect(() => {
    
    async function checkHasAccount() {
      const supabase = createClient()
      
      const { data ,error } = await supabase.auth.getUser()

      if (error) {
        setHasAccount(false)
        return
      }
      
      console.log(data.user);
      

      setHasAccount(true)

    }

    checkHasAccount()
  }, [])

  return (
    <div className='flex-1 flex items-center justify-end gap-2'>
      {!hasAccount && (
        <div className='flex items-center justify-end gap-2'>
          <a href='/sign-up' className='px-6 py-1 text-black bg-slate-100 rounded-sm shadow-sm hover:rotate-2 hover:shadow-md transition-all duration-200 ease-in-out'>
            Sign Up
          </a>
          <a href='/sign-in' className='px-6 py-1 text-slate-100 bg-red-600 rounded-sm shadow-sm hover:rotate-2 hover:shadow-md transition-all duration-200 ease-in-out'>
            Log In
          </a>
        </div>
      )}
      
      {hasAccount && (
        <button onClick={handleLogOut} className='px-6 py-1 text-slate-100 bg-red-600 rounded-sm shadow-sm hover:rotate-2 hover:shadow-md transition-all duration-200 ease-in-out'>
          Log Out
        </button>
      )}
      
    </div>
  )
}
