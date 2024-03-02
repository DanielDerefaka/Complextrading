import React from 'react'
import Navbar from '@/components/site/navigation'
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';


const layout = ({children}: {children: React.ReactNode}) => {
  return (
   
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
  >
   <main className='h-full'>
      <Navbar/>
      {children}
   </main>
   </ClerkProvider>
  )
}

export default layout