// endpoint to get json

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
    type = 'series'
  }
  try {    
    const res = await fetch(`${process.env.OMDB_API_URL}?t=${name}&type=${type}&apikey=${process.env.OMDB_API_KEY}`)
    if (!res.ok) {
      throw new Error('Could not fetch movie details')
    }
    movieDetails = await res.json()
    
  } catch (error) {
    console.log(error)
    return undefined
  }

  if (movieDetails) {
    return NextResponse.json({
      ...movieDetails
    })
  }
} 