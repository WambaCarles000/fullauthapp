import Image from 'next/image'
import Dashboard from './page';

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
  <div className= 'flex flex-col gap-y-4'>
      <nav className='bg-black text-white'>bav bar </nav>
        {children}
  </div>
      
     

  )
}
