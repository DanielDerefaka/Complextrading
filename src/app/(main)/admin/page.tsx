
import AdminLoginForm from '@/components/forms/AdminLoginForm'
import AdminLoginFormMain from '@/components/forms/AdminLoginMain'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const authUser = await currentUser()
    if(!authUser)  redirect("/sign-in");


  return (
    <div>
        {/* <AdminLoginForm/> */}
        <AdminLoginFormMain/>
    </div>
  )
}

export default page