import { NextResponse } from "next/server";

// interface Data {
//   message: string;
//   name?: string;
// }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  try {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
    if (!res.ok) {
      return NextResponse.json({
        error: 'Could not fetch data'
      })
    }
    const data = await res.json()
    
    return NextResponse.json({result: data})
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Could not fetch data'
    })
  }
} 