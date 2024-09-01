import { createClient } from "@/lib/utils/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const type = searchParams.get('type')
  const id = searchParams.get('id')

  try { 
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log(user);
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from('history')
      .insert([{ user_id: user.id, name, program_id: id, type }]);
  
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ error: null }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error
    })
  }
} 