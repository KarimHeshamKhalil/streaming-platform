'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { signIn } from '@/lib/signIn'
import { signUp } from '@/lib/signUp'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z
  .string()
  .min(1, { message: "This field has to be filled." })
  .email("This is not a valid email."),
  password: z.string().min(6)
})

export default function SignIn() {
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await signIn(values.email, values.password)
      
      if (user) {
        console.log(user)
        setError('')
        router.push('/watch?type=movie')
      }
      
    } catch (error) {
      setError(`Error: ${(error as Error).message}`)
    }
  }

  return (
    <Form {...form}>
      <form className='max-w-[600px] mx-auto mt-12 border px-5 py-5 rounded-md relative' onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className='text-red-600 text-xl mb-2'>Sign In</h2>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ex:johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='my-4'></div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="must be more than 4 characters" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <p className='px-5 py-2 text-lg text-red-800 bg-red-100 rounded-md'>
            {error}
          </p>
        )}
        <div className='flex items-center justify-center mt-4'>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
