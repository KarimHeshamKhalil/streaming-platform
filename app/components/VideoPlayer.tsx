'use client'
import React, { useEffect } from 'react'

interface VideoPlayerProps {
  type: string | string[] | undefined,
  videoUrl: string
}

export default function VideoPlayer({ type, videoUrl }: VideoPlayerProps) {

  return (
    <>
      {type === 'movie' && (
        <iframe src={videoUrl} allowFullScreen className='w-full h-[80vh]'></iframe>
      )}

      {type === 'tv' && (
        <iframe src={videoUrl} allowFullScreen className='w-full h-[94vh]'></iframe>
      )}
    </>
  )
}
