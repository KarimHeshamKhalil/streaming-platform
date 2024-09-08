'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import VideoPlayer from '../components/VideoPlayer';

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


export default function WatchPage({ params, searchParams }: SearchProps) {
  const [show, setShow] = useState<Show | null>(null)
  const [episodes, setEpisodes] = useState<EpisodeDetails[] | null>(null)
  const [error, setError] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const didMountRef = useRef(false);
  
  const type = searchParams?.type
  const id = searchParams?.id
  let name = searchParams?.name || ''
  const season = searchParams?.season || ''
  const episode = searchParams?.episode || ''

  const videoPath = type === 'tv' ? `/embed/${type}/${id}/${season}/${episode}` : `/embed/${type}/${id}`
  
  
  useEffect(() => {
    async function getShow() {      
      const res = await fetch(`api/tv?id=${id}`, {
        method: 'GET',
      })

      if (!res.ok) {
        setError('Could not find Tv Show')
        return
      }

      const {result, error} = await res.json()

      setShow(result)
    }

    if (type === 'show') getShow()
  }, [])

  useEffect(() => {
    async function postToHistory() { 
      const res = await fetch(`/api/history?name=${encodeURIComponent(`${name}`)}&id=${id}&type=${type}`, {
        method: 'POST'
      })
      
      if (!res.ok) console.log("NOT WORKING");
    }
    if (didMountRef.current) {
      postToHistory()
    } else {
      didMountRef.current = true
    }
 
    setVideoUrl(process.env.NEXT_PUBLIC_VIDSRC_1_API_URL + videoPath)
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
    
    if (season) getEpisodes()
  }, [season])
  

  const handleSrc = (src: string) => {
    if (src === '1') {
      setVideoUrl(`${process.env.NEXT_PUBLIC_VIDSRC_1_API_URL}${videoPath}`)
    } else if (src === '2') {
      setVideoUrl(`${process.env.NEXT_PUBLIC_VIDSRC_2_API_URL}${videoPath}`)
      Store.addNotification({
        message: "This source forces ads, I am sorry :(",
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
    <div className=''>
      <div className='fixed top-16 right-2 flex flex-col items-center gap-2'>
        <button onClick={() => handleSrc('1')} className='bg-red-600 text-white hover:text-red-600 hover:bg-white hover:shadow-md transition-all duration-200 ease-in-out rounded-sm px-8 py-1'>
          Source 1
        </button>
        <button onClick={() => handleSrc('2')} className='bg-red-600 text-white hover:text-red-600 hover:bg-white hover:shadow-md transition-all duration-200 ease-in-out rounded-sm px-8 py-1'>
          Source 2
        </button>
      </div>
      
      <ReactNotifications />

      <VideoPlayer type={type} videoUrl={videoUrl} />
    </div>
  )
}
