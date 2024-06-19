



'use client'

import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchema } from "@/schemas";
import { useState } from 'react';

// Retrieving data
import { register } from '@/actions/register';
import { useTransition } from 'react';

// shadcn components
// import { CardWrapper } from "./card-wrapper";
import { CardWrapper} from "./card-wrapper";


import * as input from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from "../ui/button";
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

export const RegistrationForm = () => {
  // Error handling
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  // FORM SUBMISSION State
  const [isPending, startTransition] = useTransition();

  // form setting
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    }
  });

  // form submission
  const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input.Input disabled={isPending} type="text" {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input.Input disabled={isPending} type="email" {...field} placeholder="john.doe@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input.Input disabled={isPending} type="password" {...field} placeholder="***************" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* DISPLAYING ERROR AND SUCCESS MESSAGES */}
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type='submit'
            className='w-full'
          >
            Sign up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};