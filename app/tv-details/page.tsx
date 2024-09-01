'use client'
import React, { useEffect, useState } from 'react'

interface SearchProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface Show {
  adult: boolean;
  backdrop_path: string;
  created_by: Creator[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeDetails;
  name: string;
  next_episode_to_air: null | EpisodeDetails;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface Creator {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface EpisodeDetails {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}


export default function TvDetails({ params, searchParams }: SearchProps) {
  const [season, setSeason] = useState('1')
  const [show, setShow] = useState<Show | null>(null)
  const [episodes, setEpisodes] = useState<EpisodeDetails[] | null>(null)
  const [error, setError] = useState('')
  const id = searchParams?.id

  useEffect(() => {
    async function getShow() {      
      const res = await fetch(`api/tv?id=${id}`, {
        method: 'GET'
      })

      if (!res.ok) {
        setError('Could not find Tv Show')
        return
      }

      const {result, error} = await res.json()

      console.log(result, error, 'TV SEASONS');

      setShow(result)
    }
    
    getShow()
  }, [])

  useEffect(() => {
    async function getEpisodes() {      
      const res = await fetch(`api/tv/season-details?id=${id}&season=${season}`, {
        method: 'GET'
      })

      if (!res.ok) {
        setError('Could not find Tv Show')
        return
      }

      const {result, error} = await res.json()

      setEpisodes(result.episodes)
    }
    
    getEpisodes()
  }, [season])
  console.log(season, 'SEASON');
  

  return (
    <>
      {show && (
        <div>
          <div className='w-full px-12 py-2 flex bg-stone-50'>
            <img className='h-[500px]' src={`https://image.tmdb.org/t/p/original${show?.poster_path}`} alt="Poster" />

            <div className='flex flex-col gap-y-4 py-4 px-4'>
              <h1 className='text-3xl text-red-900 font-medium'>{show?.name}</h1>

              <p className='text-lg text-stone-700 max-w-[700px]'>{show?.overview}</p>

              <div className='flex items-center gap-x-2'>
                {show?.genres.map((genre) => (
                  <span className='px-4 py-2 bg-red-700 text-white font-medium rounded-full'>
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className='px-4 py-2 bg-red-700 text-white rounded-full w-fit'>Episode Run Time <span className='font-medium bg-red-800 px-2 py-1'>{show?.episode_run_time} mins</span></p>

              <a className='text-red-600 underline text-lg' href={show?.homepage}>{show?.homepage}</a>
            </div>
          </div>
          <div className='mb-4 ml-20 mt-4 max-w-[200px] bg-red-800 text-white px-4 py-1 rounded-lg'>
            <span>Seasons:</span>
            <select className='bg-red-600 rounded-md py-1 ml-1' value={season} onChange={(e) => setSeason(e.target.value)} name="seasons">
              {show?.seasons.map((season, index) => (
                <option key={season.id} value={index+1}>{season.name}</option>
              ))}
            </select>
          </div>

          <div className='flex items-center justify-center flex-wrap gap-x-4 gap-y-2'>
            {episodes?.map((episode, index) => (
              <div className='max-w-[250px] h-[270px] rounded-lg bg-red-800 py-2' key={index}>
                <img src={`https://image.tmdb.org/t/p/original${episode.still_path}`} />

                <div className='px-4 py-2'>
                  <p className='text-white mb-2 flex flex-col'>
                    <span>S{episode.season_number} - E{episode.episode_number}</span>
                    <span className='font-medium'>{episode.name.slice(0, 22)}{episode.name.length > 21 && '...'}</span>
                  </p>

                  <div className='flex items-center justify-center'>
                    <a href={`/watch?type=tv&name=${show.name}&id=${show.id}&season=${season}&episode=${index+1}`} className='text-slate-900 bg-white opacity-100 hover:opacity-100 hover:text-red-600 hover:bg-white transition-all duration-150 px-4 py-2 cursor-pointer font-medium rounded-lg'>
                      Play Video
                    </a>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
