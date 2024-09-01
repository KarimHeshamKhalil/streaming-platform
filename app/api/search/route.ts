import { NextResponse } from "next/server";

interface Data {
  message: string;
  name?: string;
}

export async function GET(request: Request) {
  let movieDetails;
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  let type = searchParams.get('type')

  if (type === 'show') {
    type = 'tv'
  }

  try {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}search/${type}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${name}`)
    if (!res.ok) {
      return NextResponse.json({
        error: 'Could not fetch data'
      })
    }
    movieDetails = await res.json()
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Could not fetch data'
    })
  }

  if (movieDetails) {
    return NextResponse.json({
      ...movieDetails
    })
  }
} 