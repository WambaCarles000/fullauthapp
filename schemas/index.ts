import * as z from 'zod'


export const  LoginSchema = z.object({


    email : z.string().email({message:'missing or required e-mail'}),
    password : z.string().min(1,{message:'Password is required'})
    
    
    })


    export const  RegistrationSchema = z.object({


        email : z.string().email({message:'missing or required e-mail'}),
        password : z.string().min(5,{message:'minimum 6 caracters is required'}),
        name : z.string().min(6,{message:'required'}),

        
        
        })