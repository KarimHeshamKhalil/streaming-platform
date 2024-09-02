import React, { useEffect } from 'react'
import Link from 'next/link'
import AccountLink from './AccountLink'
import HamburgerNav from './HamburgerNav'


interface link {
  text: string
  to: string
}

const links: link[] = [
  {text: 'Recommendations', to:'/recommendations'},
  {text: 'Discover', to:'/discover'},
  {text: 'Search', to:'/search?type=movie'},
  {text: 'Contact Us', to:'/contact-us'}
]

export default function Navbar() {

  return (
    <nav className='flex items-center justify-around small-500:justify-center small-800:justify-start gap-4 small-800:px-16 py-2 border-b border-stone-200 z-50 suse'>
      <h1 className='text-2xl font-medium text-rose-500 small-500:hidden small-800:block'>Moviez</h1>

      <ul className='hidden small-500:flex justify-center items-center gap-4 small-800:-mb-1 '>
        {links?.map((link, index) => (
          <li className='text-white hover:text-red-600 hover:text-opacity-90 transition-all duration-100 ease-in-out' key={index}>
            <Link href={link.to}>{link.text}</Link>
          </li>
        ))}
        
        <AccountLink />
      </ul>

        <HamburgerNav links={links} />
      
    </nav>
  )
}
