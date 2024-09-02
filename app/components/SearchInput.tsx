'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Programs from './Programs'

export default function SearchInput() {
  const searchParams = useSearchParams()
  const [name, setName] = useState<string>(searchParams.get('name') || '')
  const [programName, setProgramName] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (name) {
      setLoading(true)
    }
    
    const id = setTimeout(() => {
      setProgramName(name)
    }, 1500)

    return () => clearTimeout(id)
  }, [name])

  return (
    <>
      <div className='flex items-center justify-center mb-2'>
        <div className='w-[300px] flex items-center bg-red-700 rounded-md relative'>
          <a className='flex-1 text-white px-2 py-2 text-center hover:bg-red-800 transition-all duration-100' href="/search?type=show">Show</a>
          <a className='flex-1 text-white px-2 py-2 text-center hover:bg-red-800 transition-all duration-100' href="/search?type=movie">Movie</a>
        </div>
      </div>

      <div className='flex items-center justify-center mb-4'>
        {searchParams.get('type') === 'movie' && (
          <div className='w-[600px] relative'>
            <input value={name} onChange={(e) => setName(e.target.value)} className='bg-slate-100 px-6 py-2 text-slate-950 rounded-full w-full outline-none shadow-sm focus:shadow-md' placeholder='ex:Inception' type="text" />
          </div>
        )}

        {searchParams.get('type') === 'show' && (
          <div className='w-[600px] relative'>
            <input value={name} onChange={(e) => setName(e.target.value)} className='bg-slate-100 px-6 py-2 text-slate-950 rounded-full w-full outline-none shadow-sm focus:shadow-md' placeholder='ex:Inception' type="text" />
          </div>
        )}
      </div>

      <div className='mt-2'></div>

      {loading && (
        <div className='max-w-[400px] mx-auto bg-slate-100 px-5 py-2 rounded-lg text-center text-red-600 font-medium'>
          Loading...
        </div>
      )}

      {name && (
        <Programs name={programName} type={searchParams.get('type')} loading={loading} setLoading={setLoading} />
      )}
      
    </>
  )
}
