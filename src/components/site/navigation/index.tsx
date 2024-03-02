import React from 'react'
import { User  } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/global/mode-toogle'
import { currentUser } from '@clerk/nextjs/server'

interface Props {
    user?:null | User 
}

 const Navbar = ({user }: Props) => {

    const authUser = currentUser()
    return (
        <div className='p-4 fixed top-0 left-0 right-0 z-10 flex items-center justify-between'>
            <aside className='flex items-center gap-2'>
            <Image src={'/assets/plura-logo.svg'} alt="image" width={40} height={40}/>
            <span className='text-xl font-bold '>
            Complex Trading.
            </span>
            </aside>

            <nav className='hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%]  translate-y-[-50%] '>
            <ul className='flex items-center justify-center gap-8'>
            <Link href={'#'}> Market </Link>
            <Link href={'#'}> Trading Platform </Link>
            <Link href={'#'}> Trading with us  </Link>
            <Link href={'#'}> Company </Link>
            <Link href={'#'}> Contact </Link>
            </ul>
            </nav>
            <aside className='flex gap-2 items-center'>
         
            
            <Link href={"/agency"} className='bg-primary text-white p-2 px-4 hover:bg-primary/80 rounded-md'>
                Login
            </Link>
            

            <UserButton afterSignOutUrl="/"/> 
            <ModeToggle/>
            </aside>
        </div>
    )
}

export default Navbar