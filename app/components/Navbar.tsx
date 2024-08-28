import React from 'react'

interface link {
  text: string
  to: string
}

const links: link[] = [
  {text: 'Recommendations', to:'/recommendations'},
  {text: 'Watch', to:'/watch?type=movies'},
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

      <div className='flex-1 flex items-center justify-end gap-2'>
        <a href='/sign-up' className='px-6 py-1 text-black bg-slate-100 rounded-sm shadow-sm hover:rotate-2 hover:shadow-md transition-all duration-200 ease-in-out'>
          Sign Up
        </a>
        <a href='/sign-in' className='px-6 py-1 text-slate-100 bg-red-600 rounded-sm shadow-sm hover:rotate-2 hover:shadow-md transition-all duration-200 ease-in-out'>
          Log In
        </a>
      </div>
    </nav>
  )
}
