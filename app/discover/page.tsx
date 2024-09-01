import React from 'react'
import Programs from '../components/Programs'
import ProgramInfo from '../components/ProgramInfo';

export default async function DiscoverMovies() {
  const res1 = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/popular`, {
    method: 'GET'
  })

  const res2 = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/top-rated`, {
    method: 'GET'
  })

  const {popularMovies, popularShows, error: popularError} = await res1.json()
  const {topMovies, topShows, error: topError} = await res2.json()
  

  return (
    <div className='px-20 py-8'>
      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Popular Movies</h3>

        <div className='max-w-full min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {popularMovies && (
            popularMovies.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Popular Shows</h3>

        <div className='max-w-full min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {popularShows && (
            popularShows.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Top Rated Movies</h3>

        <div className='max-w-full min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {topMovies && (
            topMovies.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Top Rated Shows</h3>

        <div className='max-w-full min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {topShows && (
            topShows.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
