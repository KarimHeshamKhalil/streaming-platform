import React, { Suspense } from 'react'
import SearchInput from '../components/SearchInput'
import LoadingNotification from '../components/LoadingNotification';

interface SearchProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function page({ params, searchParams }: SearchProps) {

  return (
    <>
      <div>
        <div className='mt-6 mb-6'>
          <SearchInput />
        </div>
      </div>
      {/* 
        {data?.Error && (
          <p className='text-red-800 bg-red-100 px-16 py-2 rounded-md text-xl mt-8'>
            !{data.Error}!
          </p>
        )}

        {!data && (
          <div className='w-[800px] h-[490px] bg-black flex items-center justify-center'>
            <p className='text-black text-lg bg-red-300 px-6 py-2 rounded-md '>Start searching to watch your movie!</p>
          </div>
        )}
      </div> */}
    </>
  )
}
