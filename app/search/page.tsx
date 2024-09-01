import React, { Suspense } from 'react'
import SearchInput from '../components/SearchInput'

export default async function page() {

  return (
    <>
      <div>
        <div className='mt-6 mb-6'>
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      </div>
    </>
  )
}
