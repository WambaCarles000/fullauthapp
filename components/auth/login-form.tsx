'use client'

import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useState } from 'react'

// retrieving data 
import { login } from '@/actions/login'
import { useTransition } from 'react'

// shadcn components
import { CardWrapper } from "./card-wrapper";
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from "../ui/button";
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success'



export const LoginForm = () => {
  // Error handling
  const [formError, setFormError] = useState<string | undefined>("")
  const [formSuccess, setFormSuccess] = useState<string | undefined>("")

  // FORM SUBMISSION State
  const [isPending, startTransition] = useTransition()

  // form setting
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // form submission
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setFormError("")
    setFormSuccess("")

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setFormError(data.error)
          } else if (data?.success) {
            setFormSuccess(data.success)
          }
        })
    })
  }

  return (
    <CardWrapper
      headerLabel="welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/registration"
      showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="email" {...field} placeholder="john.doe@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} type="password" {...field} placeholder="***************" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* DISPLAYING ERROR AND SUCCESS MESSAGES */}
            <FormError message={formError} />
            <FormSuccess message={formSuccess} />
            <Button
              type='submit'
              className='w-full'
            >
              login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}


