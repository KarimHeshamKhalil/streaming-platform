'use client'
import { TMDBMovieResult } from '@/lib/types'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProgramInfo({info} : TMDBMovieResult | any) {
  const [message, setMessage] = useState<string>('')
  const [isModal, setIsModal] = useState(false)
  const [imageError, setImageError] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  

  return (
    <>
      {(info?.title || info?.name) && !info.adult && (
        <img onClick={() => setIsModal(prevVal => !prevVal)} className='h-[300px] shadow-md hover:rotate-3 hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer' src={`https://image.tmdb.org/t/p/original${info.poster_path}`} alt="Poster" />
      )}

      {isModal && (
        <>
          
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsModal(prevVal => !prevVal)}
            ></div>
            <div className="bg-white rounded-lg py-2 shadow-lg z-50 relative max-w-[550px] overflow-hidden">
              <button 
                className="absolute -top-2 -right-2 text-slate-100 bg-red-600 rounded-lg px-4 pb-1 pt-3 pr-5 z-[1000]"
                onClick={() => setIsModal(prevVal => !prevVal)}
              >
                &times;
              </button>
              <div>
                <div className='relative'>
                  {imageError ? (
                    <>
                      <div className='w-full mx-auto mb-4 py-4 px-4  rounded-xl bg-stone-100'>
                        <p>Background Not Found Sorry :&#40;</p>
                      </div>

                      <a href={searchParams.get('type') === 'show' ? `/tv-details?id=${info.id}`: `/watch?type=${searchParams.get('type')}&id=${info.id}`} className='text-white bg-red-600 opacity-100 hover:opacity-100 hover:text-red-600 hover:bg-white transition-all duration-150 px-4 py-2 cursor-pointer font-medium rounded-lg relative left-4'>
                        Play Video
                      </a>
                  </>
                  ): (
                    <>
                      <img className='w-full h-[300px]' src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} onError={() => setImageError(true)} />
                      <a href={searchParams.get('type') === 'show' ? `/tv-details?id=${info.id}`: `/watch?type=${searchParams.get('type')}&id=${info.id}&name=${info.title}`} className='text-white bg-red-600 opacity-100 hover:opacity-100 hover:text-red-600 hover:bg-white transition-all duration-150 px-4 py-2 cursor-pointer font-medium rounded-lg absolute bottom-2 left-2'>
                        Play Video
                      </a>
                  </>
                  )}
                </div>

                <div className='px-4 py-2'>
                  <h3 className='text-lg font-medium'>{info.title} {info.name}</h3>

                  <p className='text-stone-800'>{info.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
