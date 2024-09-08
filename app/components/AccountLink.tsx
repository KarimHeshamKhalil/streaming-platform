'use client'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AccountLink() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/account')
    router.refresh()
  }

  return (
    <li onClick={handleClick} className='text-white small-500:hover:text-red-600 small-500:hover:text-opacity-90 max-small-500:hover:bg-slate-900 transition-all duration-100 ease-in-out cursor-pointer max-small-500:block max-small-500:w-full max-small-500:text-center max-small-500:py-4 max-small-500:border-b max-small-500:text-xl'>
      <span>Account</span>
    </li>
  )
}
