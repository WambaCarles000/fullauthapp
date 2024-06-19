import Image from 'next/image'
import {auth} from '@/auth'

export default async function Settings() {

  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
  
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            

            {JSON.stringify(session)}
           
           
           
    




            
            </p>
  
    </main>
  )
}
