'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProgramInfo from './ProgramInfo'

export default function SearchInput() {
  const searchParams = useSearchParams()
  const [name, setName] = useState<string>(searchParams.get('name') || '')
  const [programName, setProgramName] = useState('')
  const [season, setSeason] = useState<string>(searchParams.get('s') || '')
  const [episode, setEpisode] = useState<string>(searchParams.get('ep') || '')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  
  const handleType = (type: string) => {
    if (type === 'movie') {
      router.push(`?type=movie`)
    } else if (type === 'show') {
      router.push(`?type=show`)
    }
    if (type === 'movie' || type === 'show') {
      setName('')
      setEpisode('')
      setSeason('')
    }
  }

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
      <div className='w-[50%] mx-auto px-2 flex items-center mb-4 bg-red-600 rounded-md'>
        <button onClick={() => handleType('show')} className='bg-red-600 text-slate-50 hover:bg-red-700 flex-1 px-4 py-1 rounded-md font-medium'>Show</button>
        <div className='h-[40px] w-[2px] bg-white'></div>
        <button onClick={() => handleType('movie')} className='bg-red-600 text-slate-50 hover:bg-red-700 flex-1 px-4 py-1 rounded-md font-medium'>Movie</button>
      </div>

      {searchParams.get('type') === 'movie' && (
        <div className='w-[600px] relative'>
          <input value={name} onChange={(e) => setName(e.target.value)} className='bg-slate-100 px-6 py-2 rounded-full w-full outline-none shadow-sm focus:shadow-md' placeholder='ex:Inception' type="text" />
        </div>
      )}

      {searchParams.get('type') === 'show' && (
        <div className='w-[600px] relative'>
          <input value={name} onChange={(e) => setName(e.target.value)} className='bg-slate-100 px-6 py-2 rounded-full w-full outline-none shadow-sm focus:shadow-md' placeholder='ex:Inception' type="text" />
        </div>
      )}

      {searchParams.get('type') === 'show' && (
        <div className='w-[50%] mx-auto flex items-center bg-red-600 rounded-md mt-2 relative'>
          <input value={season} onChange={(e) => setSeason(e.target.value)} className='bg-red-600 outline-none text-white px-4 py-2 rounded-md placeholder:text-stone-100 w-[160px]' type="number" placeholder='Season' />
          <div className='h-[40px] w-[2px] absolute left-[50%] flex-1 bg-white'></div>
          <input value={episode} onChange={(e) => setEpisode(e.target.value)} className='bg-red-600 outline-none text-white px-4 py-2 rounded-md placeholder:text-stone-100 w-[160px]' type="number" placeholder='Episode' />
        </div>
      )}

      <div className='mt-2'></div>

      {loading && (
        <div className='w-full bg-slate-100 px-5 py-2 rounded-lg text-center text-red-600 font-medium'>
          Loading...
        </div>
      )}

      {name && (
        <ProgramInfo name={programName} type={searchParams.get('type')} season={season} episode={episode} loading={loading} setLoading={setLoading} />
      )}

      
    </>
  )
}
