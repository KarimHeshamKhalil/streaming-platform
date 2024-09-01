import React, { useEffect } from 'react'
import AccountSection from './AccountSection'

interface link {
  text: string
  to: string
}

const links: link[] = [
  {text: 'Recommendations', to:'/recommendations'},
  {text: 'Search', to:'/search?type=movie'},
  {text: 'Contact Us', to:'/contact-us'}
]

export default function Navbar() {

  return (
    <nav className='flex items-center gap-4 px-16 py-2 border-b border-stone-200'>
      <h1 className='text-2xl font-medium text-red-800'>Moviez</h1>

      <ul className='flex items-center gap-4 -mb-1'>
        {links?.map((link, index) => (
          <li className='text-stone-950 hover:text-red-900 hover:text-opacity-90 transition-all duration-100 ease-in-out' key={index}>
            <a href={link.to}>{link.text}</a>
          </li>
        ))}
      </ul>

      

      <AccountSection />
    </nav>
  )
}
