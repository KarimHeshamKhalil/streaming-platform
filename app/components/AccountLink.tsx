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
    <li onClick={handleClick} className='text-stone-950 hover:text-red-900 hover:text-opacity-90 transition-all duration-100 ease-in-out cursor-pointer'>
      <span>Account</span>
    </li>
  )
}
