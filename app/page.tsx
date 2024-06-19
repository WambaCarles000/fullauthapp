


import Image from 'next/image';
import {Button} from '@/components/ui/button'
import { LoginButton } from '@/components/auth/login-button';

export default function Home() {
  return (
    <main className="flex h-screen justify-center items-center bg-black">

      <div className='text-center'>
        <h1 className='text-6xl font-semibold text-white drop-shadow-md'>
          Authentication demo
        </h1>
        <p className='text-white text-lg'>
      auth version5 
        </p>

        <LoginButton >
          <Button variant='link' size='lg' style={{ borderRadius: '9999px' }} >
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
