import React from 'react'
import Programs from '../components/Programs'
import ProgramInfo from '../components/ProgramInfo';
import { GET as GET_POPULAR } from '../api/popular/route' ;
import { GET as GET_TOP_RATED } from '../api/top-rated/route' ;

export default async function DiscoverMovies() {
  const res1 = await GET_POPULAR()
  const res2 = await GET_TOP_RATED()

  if (!res1.ok || !res2.ok) {
    return (
      <div>
        response not okay
      </div>
    )
  }

  const {popularMovies, popularShows, error} = await res1.json()
  const {topMovies, topShows, error: topError} = await res2.json()
  

  return (
    <div className='px-4 small-800:px-20 py-8 suse'>
      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Popular Movies</h3>

        <div className='max-w-full min-h-[215px] small-800:min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {popularMovies && (
            popularMovies.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[134px] small-800:min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Popular Shows</h3>

        <div className='max-w-full min-h-[215px] small-800:min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {popularShows && (
            popularShows.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[134px] small-800:min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Top Rated Movies</h3>

        <div className='max-w-full min-h-[215px] small-800:min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {topMovies && (
            topMovies.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[134px] small-800:min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className='mb-6'>
        <h3 className='text-2xl font-medium mb-2'>Top Rated Shows</h3>

        <div className='max-w-full min-h-[215px] small-800:min-h-[330px] flex items-center gap-2 scroll overflow-x-auto o '>
          {topShows && (
            topShows.map((item: any, index: React.Key | null | undefined) => (
              <div className='min-w-[134px] small-800:min-w-[200px]' key={index}>
                <ProgramInfo info={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
