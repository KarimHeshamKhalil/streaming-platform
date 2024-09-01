'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProgramInfo from './ProgramInfo';
import { TMDBMovieResult } from '@/lib/types';

interface InfoProps {
  type: string | null;
  name: string | null;
  loading: boolean;
  setLoading: Function;
}

interface TMDBMovieSearchResponse {
  page: number;
  results: TMDBMovieResult[];
  total_results: number;
  total_pages: number;
}



export default function Programs({ type, name, loading, setLoading }: InfoProps) {
  const [message, setMessage] = useState<string>('')
  const [results, setResults] = useState<TMDBMovieResult[] | null>(null)

  useEffect(() => {
    async function getData() {      
      const res = await fetch(`api/search?name=${name}&type=${type}`, {
        method: 'GET'
      })

      if (!res.ok) {
        setMessage('Movie or Show not found')
        setLoading(false)
        return
      }

      const {results, error} = await res.json()
      
      setResults(results)
      setLoading(false)
    }
    
    getData()
    
  }, [name])

  return (
    <>
      {results && (
        <div className='flex items-center justify-center gap-x-2 gap-y-4 flex-wrap px-4'>
          {results.map((program, index) => (
            <div key={index}>
              <ProgramInfo info={program}  />
            </div>
          ))}
        </div>
      )}
      
    </>
  )
}
