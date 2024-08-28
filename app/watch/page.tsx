import React, { Suspense } from 'react'
import SearchInput from '../components/SearchInput'
import LoadingNotification from '../components/LoadingNotification';

interface SearchProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function page({ params, searchParams }: SearchProps) {
  console.log(`http://localhost:3000/api/search?name=${searchParams?.name}&type=${searchParams?.type}`)
  const res = searchParams?.name ? await fetch(`http://localhost:3000/api/search?name=${searchParams?.name}&type=${searchParams?.type}`, {
    method: 'GET'
  }): null
  const data = res ? await res.json(): null
  
  // console.log(data);
  
  // console.log(`${process.env.VIDSRC_API_URL}embed/tv/${data?.imdbID}/${searchParams?.s}/${searchParams?.ep}`);
  

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* <h1 className='mt-6 mb-2 text-2xl text-stone-900'>Search <span className='capitalize'>{searchParams?.type}</span> by name</h1> */}
    
      <div className='mt-6 mb-6'>
        <SearchInput />
      </div>

      {data?.imdbID && searchParams?.type === 'movie' && (
        <iframe src={`${process.env.VIDSRC_API_URL}embed/movie/${data?.imdbID}`} allowFullScreen className='w-[800px] h-[490px]'></iframe>
      )}

      {data?.imdbID && searchParams?.type === 'show' && (
        <iframe src={`${process.env.VIDSRC_API_URL}embed/tv/${data?.imdbID}/${searchParams?.s}/${searchParams?.ep}`} allowFullScreen className='w-[800px] h-[490px]'></iframe>
      )}

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
    </div>
  )
}
