import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const season = searchParams.get('season')

  console.log(`${process.env.TMDB_API_URL}tv/${id}?api_key=${process.env.TMDB_API_KEY}`);
  

  try {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${id}/season/${season}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    if (!res.ok) {
      return NextResponse.json({
        error: 'Could not fetch data'
      })
    }
    const data = await res.json()

    console.log(data, "HERE!!!!");
    
    return NextResponse.json({result: data})
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Could not fetch data'
    })
  }
} 