import AgencyDetails from '@/components/forms/AgencyDetails'
import UserDetails from '@/components/global/UserDetails'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
params:{agencyId: string}
}

const Setting =  async ({params}: Props) => {
    const authUser = await currentUser()
    if(!authUser) return null

    const userDetails = await db.user.findUnique({
        where:{
            email:authUser.emailAddresses[0].emailAddress,
        }
    })

    if(!userDetails) return null 

    const agencyDetails = await db.agency.findUnique({
        where: {
            id: params.agencyId
        }
    })


    if(!agencyDetails) return null
  return (
    <div className='flex ld:flex-row fllex-ccol gap-4'>
        <AgencyDetails data={agencyDetails} />
        <UserDetails type="agency" id={params.agencyId} userData={userDetails} />
    </div>
  )
}

export default Setting