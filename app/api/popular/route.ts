import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try { 
    const movieRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    const showRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/popular?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
  
    if (!movieRes.ok || !showRes.ok) {
      return NextResponse.json({ error: 'Could not fetch discover' }, { status: 404 });
    }

    const { results: popularMovies } = await movieRes.json()
    const { results: popularShows } = await showRes.json()

    return NextResponse.json({ popularMovies, popularShows })
      
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message })
  }
} 