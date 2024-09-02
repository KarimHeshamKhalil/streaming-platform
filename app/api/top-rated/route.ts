import { NextResponse } from "next/server";

export async function GET_TOP_RATED() {
  try { 
    const movieRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const showRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/top_rated?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
  
    if (!movieRes.ok || !showRes.ok) {
      return NextResponse.json({ error: 'Could not fetch discover' }, { status: 404 });
    }

    const { results: topMovies } = await movieRes.json()
    const { results: topShows } = await showRes.json()

    return NextResponse.json({ topMovies, topShows })
      
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message })
  }
} 