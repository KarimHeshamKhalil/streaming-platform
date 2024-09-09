'use client'
import { TMDBMovieResult } from '@/lib/types'
import React, { useState } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

export default function ProgramInfo({info, programType} : TMDBMovieResult | any) {
  const [message, setMessage] = useState<string>('')
  const [isModal, setIsModal] = useState(false)
  const [backdropError, setBackdropError] = useState(false)
  const [posterError, setPosterError] = useState(false)
  let type = info.name ? 'tv': 'movie'

  if (programType === 'movie') {
    type = programType
    info.title = info.name
    info.id = info.program_id
  }
  
  const handleWatchLater = async () => {
    const name = info.name || info.title
    try {
      const res = await fetch(`/api/watch-later?id=${info.id}&type=${type}&name=${encodeURIComponent(name)}&overview=${encodeURIComponent(info.overview)}&poster_path=${encodeURIComponent(info.poster_path)}&backdrop_path=${info.backdrop_path}`, {
        method: 'POST'
      })

      if (!res.ok) {
        console.log('Could not post to watch_later');
        throw new Error('watch_later POST response not okay')
      }

      console.log('success');
      

      Store.addNotification({
        message: "Added successfully to your Watch Later",
        type: "success",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } catch (error) {
      Store.addNotification({
        message: "Already in your Watch Later or an Error has occurred",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  }
  

  return (
    <>
      {(info?.title || info?.name) && !info.adult && (
        <>
          {posterError ? (
            <div onClick={() => setIsModal(prevVal => !prevVal)} className='w-[200px] h-[300px] bg-slate-900 text-white px-5 py-4 shadow-md hover:rotate-3 hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer'>
              <span className='text-xl'>{info.title}{info.name}</span>
              <p className='mt-4 text-stone-200'>{info.overview.length > 125 ? `${info.overview.slice(0, 125)}...`: info.overview}</p>
            </div>
          ): (
            <img onClick={() => setIsModal(prevVal => !prevVal)} className='h-[200px] small-800:h-[300px] shadow-md hover:rotate-3 hover:shadow-xl transition-all duration-200 ease-in-out cursor-pointer' src={`https://image.tmdb.org/t/p/original${info.poster_path}`} alt="Poster" onError={() => setPosterError(true)} />
          )}
        </>
      )}

      {isModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <ReactNotifications />
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsModal(prevVal => !prevVal)}
            ></div>
            <div className="bg-slate-950 text-white rounded-lg py-2 shadow-lg z-50 relative max-w-[550px] overflow-hidden">
              <button 
                className="absolute -top-2 -right-2 text-slate-100 bg-red-600 rounded-lg px-4 pb-1 pt-3 pr-5 z-[1000]"
                onClick={() => setIsModal(prevVal => !prevVal)}
              >
                &times;
              </button>
              <div>
                <div className='relative'>
                  {backdropError ? (
                    <>
                      <div className='w-full mx-auto mb-4 py-4 px-4  rounded-xl bg-stone-100'>
                        <p>Background Not Found Sorry :&#40;</p>
                      </div>

                      <a href={type === 'tv' ? `/tv-details?id=${info.id}`: `/watch?type=${type}&id=${info.id}&name=${encodeURIComponent(info.title)}`} className='text-white bg-red-600 opacity-100 hover:opacity-100 hover:text-red-600 hover:bg-white transition-all duration-150 px-4 py-2 cursor-pointer font-medium rounded-lg relative left-4'>
                        Play Video
                      </a>

                      <button onClick={handleWatchLater} className='text-red-600 bg-white opacity-100 hover:opacity-100 hover:text-white hover:bg-red-600 transition-all duration-150 px-4 py-2 cursor-pointer font-medium rounded-lg relative left-4'>
                        Add to Watch Later
                      </button>
                  </>
                  ): (
                    <>
                      <img className='w-full max-small-500:max-h-[250px] h-fit' src={`https://image.tmdb.org/t/p/original${info.backdrop_path}`} onError={() => setBackdropError(true)} />
                      <div className='absolute bottom-2 left-2 flex items-center gap-2'>
                        <a href={type === 'tv' ? `/tv-details?id=${info.id}`: `/watch?type=${type}&id=${info.id}&name=${encodeURIComponent(info.title)}`} className='text-white bg-red-600 opacity-100 hover:opacity-100 hover:text-red-600 hover:bg-white transition-all duration-150 px-4 py-2 cursor-pointer font-medium rounded-lg capitalize'>
                          Play {type}
                        </a>

                        <button onClick={handleWatchLater} className='text-white bg-blue-700 opacity-100 hover:opacity-100 hover:bg-white hover:text-blue-700 transition-all duration-150 px-4 py-2 cursor-pointer font-medium rounded-lg'>
                          Add to Watch Later
                        </button>
                      </div>
                  </>
                  )}
                </div>

                <div className='px-4 py-2'>
                  <h3 className='text-lg font-medium'>{info.title} {info.name}</h3>

                  <p className='text-stone-200 roboto'>{info.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
