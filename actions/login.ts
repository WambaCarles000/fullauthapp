// 'use server'

// import * as z from 'zod'

// import { LoginSchema } from '@/schemas'
// // import { async } from '../.next/server/vendor-chunks/next';
// import { getPasswordResetTokenByToken } from '../data/password-reset-token';
// import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

// export const login = async(values:z.infer<typeof LoginSchema> )=>{
   
//      const validation = LoginSchema.safeParse(values)//validation des donnees cote backend 

//      if(!validation.success){


//           return {error : 'invalid fields'}
     
//      }
     

//        const {email,password} = validation.data

//        try{


//           await signIn("credentials",{
//                email,
//                password,
//               redirectTo: DEFAULT_LOGIN_REDIRECT}
//           )
//        }
//      catch(error){

//           if (error instanceof AuthError) {
//                switch (error.type) {
//                  case "CredentialsSignin": 
//                    return { error: "Invalid credentials!" }
//                  default: 
//                    return { error: "Something went wrong!" }
//                }

//      }
//   throw error
     

//      }
     

// }





"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
// import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
// import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: "Invalid credentials!" }
  }

  

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": 
          return { error: "Invalid credentials!" }
        default: 
          return { error: "Something went wrong!" }
      }
    }

    throw error
  }
}