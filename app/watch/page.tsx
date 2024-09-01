'use client'

import { createClient } from '@/lib/utils/client';
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

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
  const didMountRef = useRef(false);
  
  const type = searchParams?.type
  const id = searchParams?.id
  let name = searchParams?.name || ''
  const season = searchParams?.season || ''
  const episode = searchParams?.episode || ''

  const videoUrl = type === 'tv' ? `${process.env.NEXT_PUBLIC_VIDSRC_API_URL}embed/${type}/${id}/${season}/${episode}` : `${process.env.NEXT_PUBLIC_VIDSRC_API_URL}embed/${type}/${id}`
  
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
      const res = await fetch(`/api/history?name=${name}&id=${id}&type=${type}`, {
        method: 'POST'
      })
      
      if (!res.ok) console.log("NOT WORKING");
    }
    if (didMountRef.current) {
      postToHistory()
    } else {
      didMountRef.current = true
    }

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
  

  return (
    <>
      {type === 'movie' && id && (
        <iframe src={videoUrl} allowFullScreen className='w-full h-screen'></iframe>
      )}
      {type === 'tv' && id && (
        <iframe src={videoUrl} allowFullScreen className='w-full h-screen'></iframe>
      )}
    </>
  )
}
