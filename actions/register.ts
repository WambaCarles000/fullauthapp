'use server'



import bcrypt from 'bcryptjs';
import * as z from 'zod'


// import { async } from '../.next/server/vendor-chunks/next';
import { RegistrationSchema } from '@/schemas';
import { db } from '@/lib/db';

export const register = async(values:z.infer<typeof RegistrationSchema> )=>{
   
     const validation = RegistrationSchema.safeParse(values)//validation des donnees cote backend 

     if(!validation.success){


          return {error : 'invalid fields'}
     
     }

     //CHECKING FOR VALIDATION data

     const {email,password,name} = validation.data

     //hashing the password
     const hashedPassword = await bcrypt.hash(password,10)

     // checking for existing user 

     const existingUser = await db.user.findUnique({


          where : {email},
          
     })
  
        if(existingUser){


          return {error : 'user already exists'}
        }




        //returning the user
        await db.user.create({

          data:{
               
               email,
               name,
               password :  hashedPassword
          }

          })

          // SEND VERIFICATION TOKEN MAIL

       return { success : 'Your account has been successfully created!'}


     


     

}