'use client'
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Link from 'next/link';
import AccountLink from './AccountLink';

interface link {
  text: string,
  to: string
}

interface links {
  links: link[]
}

export default function HamburgerNav({ links }: links) {
  const [isShown, setIsShown] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsShown(prevVal => !prevVal)} className='small-500:hidden text-2xl text-white'>
        <RxHamburgerMenu />
      </button>

      {isShown && (
        <div className='fixed inset-0 z-[1000] bg-slate-950 flex flex-col small-500:hidden'>
          <div className='flex justify-end px-6 py-4 mb-12'>
            <button onClick={() => setIsShown(prevVal => !prevVal)} className='small-500:hidden text-2xl text-white hover:rotate-12 drop-shadow-xl transition-all duration-200 ease-in-out'>
              <IoMdClose />
            </button>
          </div>

          <ul>
            {links.map((item, index) => (
              <li key={index}>
                <Link onClick={() => setIsShown(prevVal => !prevVal)} className='block w-full text-center text-xl py-4 border-b hover:bg-slate-900 transition-all duration-100' href={item.to}>
                  <span className='drop-shadow-red'>{item.text}</span>
                </Link>
              </li>
            ))}

            <div onClick={() => setIsShown(prevVal => !prevVal)}>
              <AccountLink />
            </div>
          </ul>
        </div>
      )}
    </>
  )
}
