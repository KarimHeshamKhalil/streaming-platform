import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const id = searchParams.get('id')
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}${type}/${id}/recommendations?language=en-US&page=1&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
  
  if (!res.ok) {
    console.log('Could not fetch reccomendations');
    return NextResponse.json({ error: 'Could not fetch recommendations' })
  }

  const data = await res.json()
  return NextResponse.json({data})

}