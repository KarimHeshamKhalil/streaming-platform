import { createClient } from '@/lib/utils/server';
import { redirect } from 'next/navigation';
import React from 'react'
import ProgramInfo from '../components/ProgramInfo';
import DeleteButton from '../components/DeleteButton';
import LogoutButton from '../components/LogoutButton';
import { revalidatePath } from 'next/cache';


export default async function Account() {
  const supabase = createClient()
      
  const { data: user ,error } = await supabase.auth.getUser()

  if (error || !user.user) {
    console.log(error);
    redirect('/sign-up')
  }

  const { data: watchLater, error: watchLaterError } = await supabase.from('watch_later').select().eq('user_id', user.user.id).order('created_at', {ascending: false})
  
      
  return (
    <div>
      {user.user && (
        <>
        <div className='max-w-[700px] mx-auto mt-6 mb-6'>
          <h2 className='text-2xl font-medium mb-4'>Your Account</h2>

          <p className='bg-slate-100 px-4 py-2 rounded-lg mb-2 shadow-sm'>
            <span className='font-medium mr-1'>Email:</span>
            <span>{user.user.email}</span>
          </p>
          <p className='bg-slate-100 px-4 py-2 rounded-lg mb-2 shadow-sm'>
            <span className='font-medium mr-1'>Created At:</span>
            <span>{user.user.email_confirmed_at}</span>
          </p>

          <div className='flex items-center justify-center'>
            <LogoutButton />
          </div>
        </div>

        <div className='max-w-[700px] mx-auto'>
        <h2 className='text-2xl font-medium mb-2'>Watch Later</h2>

          <div className='max-w-full min-h-[330px] flex items-center gap-2 scroll overflow-x-auto'>
            {watchLater && (
              watchLater.map((item, index) => (
                <div className='min-w-[200px] relative group' key={index}>
                  <ProgramInfo info={item} programType={item.type} />
                  <DeleteButton programId={item.program_id} userId={user.user.id} />
                </div>
              ))
            )}
          </div>
        </div>
        </>
      )}
    </div>
  )
}
