'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface InfoProps {
  type: string | null;
  name: string | null;
  season: string | null;
  episode: string | null;
  loading: boolean;
  setLoading: Function;
}

interface Ratings {
  Source: string;
  Value: string;
}

interface Movie {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Rated: string;
  Ratings: Ratings[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons: string;
  Error: string;
}

export default function ProgramInfo({ type, name, season, episode, loading, setLoading }: InfoProps) {
  const [message, setMessage] = useState<string>('')
  const [info, setInfo] = useState<Movie | null>(null)
  const router = useRouter()

  const handleSearch = () => {
    if (name && name.length > 3) {
      if (type === 'show' && !season && !episode) {
        return
      }
      router.push(`?type=${type}&name=${name}${type === 'show' ? `&s=${season}&ep=${episode}`: ''}`)
    }
  }

  console.log(info, name);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`http://localhost:3000/api/search?name=${name}&type=${type}`, {
        method: 'GET'
      })

      if (!res.ok) {
        setMessage('Movie or Show not found')
        return
      }

      const data = await res.json()

      setInfo(data)
      setLoading(false)
    }
    
    getData()
  }, [name])

  return (
    <>
      {info?.Title && !loading && (
        <div className='w-full flex gap-4 bg-slate-100 px-5 py-2 rounded-lg hover:outline outline-1 outline-stone-600 transition-all duration-100 cursor-pointer group shadow-sm' onClick={handleSearch}>
          <img className='h-[200px] shadow-md' src={info.Poster} alt="Poster" />

          <div className='flex flex-col item'>
            <span className='text-xl font-medium'>{info.Title}</span>

            <div className='flex items-center flex-wrap gap-x-2 mb-2 max-w-[400px]'>
              {info.Ratings.map((rating, index) => (
                <p key={index} className='text-stone-700 flex items-center gap-1'>
                  <span>{rating.Source}:</span>
                  <span>{rating.Value}</span>
                </p>
              ))}
            </div>

            <p className='max-w-[400px]'>{info.Plot}</p>

            <div className='w-full mt-2'>
              <button className='text-red-600 group-hover:underline transition-all duration-100'>
                Click to Watch
              </button>
            </div>
          </div>
        </div>
      )}

      {info?.Error && !loading && (
        <div className='w-full bg-slate-100 px-5 py-2 rounded-lg text-center text-red-600 font-medium'>
          {info?.Error}
        </div>
      )}

      
    </>
  )
}
