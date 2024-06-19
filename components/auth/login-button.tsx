'use client'

import {useRouter} from 'next/navigation'
interface LoginButtonProps{

    children : React.ReactNode
    mode?:"modal"|"redirect"
    asChild?: boolean

}

export const LoginButton = (
    {children,
     mode = "redirect",
     asChild}
    :LoginButtonProps) => {

        const route = useRouter()

     const onClick = ()=>{
        route.push("/auth/login")
     }


return(


   

    <span  onClick = {onClick} className="bg-white p-1 mt-7 cursor-pointer">

        {children}

        </span>
)

    }