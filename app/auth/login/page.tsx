import Image from 'next/image'

import { LoginForm }  from '@/components/auth/login-form'

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
  
          <div className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            


            <LoginForm/>




            
            </div>
  
    </main>
  )
}
