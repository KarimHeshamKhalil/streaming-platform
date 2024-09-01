'use client'
import { createClient } from '@/lib/utils/client'
import { redirect, useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import ProgramInfo from '../components/ProgramInfo'

export default function Recommendations() {
  const [history, setHistory] = useState<any[] | null>(null)
  const [recommendations, setRecommendations] = useState<unknown[] | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchHistory() {
      const supabase = createClient()
      const { data: user ,error: userError } = await supabase.auth.getUser()

      
      
      if (userError || !user.user) {
        console.log('redirect');
        router.replace("/sign-up")
        return
      }

      const { data, error } = await supabase
      .from('history')
      .select()
      .eq('user_id', user.user.id)

      if (error) {
        console.log(error);
        
        return
      }
      setHistory(data.reverse())
    }

    fetchHistory()
  }, [])

  useEffect(() => {
    async function getRecommendations() {
      if (!history) return
      try {
        const res = await fetch(`/api/recommendations?id=${history[0].program_id}&type=${history[0].type}`)

        if (!res.ok) {
          console.log('Error: Could not fetch Reccomendations');
        }

        const {data} = await res.json()

        console.log(data);
        setRecommendations(data.results)
        
      } catch (error) {
        
      }
    }
    
    getRecommendations()
  }, [history])

  console.log(history, "HERE");
  

  return (
    <div>
      <div className='max-w-[600px] mx-auto py-5 '>
        <h2 className='text-2xl font-medium mb-2'>History</h2>
        <div className='flex items-center gap-4 py-2 border-b '>
          {history && (
            history.map((item, index) => (
              <p key={index}>{item.name}</p>
            ))
          )}
        </div>
      </div>

      <h2 className='text-2xl font-medium mt-12 max-w-[600px] mx-auto py-5'>Reccomendations based on last Movie/TV Show</h2>
      <div className='flex items-center flex-wrap gap-4 px-6 pb-4 max-w-[900px] mx-auto'>
        {recommendations?.map((item, index) => (
          <div key={index}>
            <ProgramInfo info={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
