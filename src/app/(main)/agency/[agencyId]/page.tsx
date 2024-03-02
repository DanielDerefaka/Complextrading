import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { db } from '@/lib/db'
import { AreaChart } from '@tremor/react'
import { Contact2, DollarSign, Goal } from 'lucide-react'
import { Deposit, Balance} from '@prisma/client'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import Widget from '@/components/site/tradingview/widget'

const Page = async ({
  params,
}: {
  params: { agencyId: string }
  searchParams: { code: string }
}) => {
  let currency = 'USD'
  let sessions
  let totalClosedSessions
  let totalPendingSessions
  let net = 0
  let potentialIncome = 0
  let closingRate = 0
  const currentYear = new Date().getFullYear()
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000


  const authUser = await currentUser();
  if (!authUser) return null;

  const getBalance = await db.balance.findUnique({
    where: {
      userId: authUser.id,
    },
  
  });

  if (!getBalance) return null;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id:params.agencyId
    }
  })

  if(!agencyDetails) return
  return (
    <div className="relative h-full"> 
      <h1 className='text-4xl'> Dashboard</h1>
      <Separator className=" my-6" />
    
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex gap-4 flex-col xl:!flex-row">
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Balance</CardDescription>
              <CardTitle className="text-4xl">
                {/* {net ? `${currency} ${net.toFixed(2)}` : `$0.00`} */}
                ${getBalance.amount}
              </CardTitle>
              <small className="text-xs text-muted-foreground">
                For the year {currentYear}
              </small>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Total Balance for this account dashboard.
            </CardContent>
            {/* <DollarSign className="absolute right-4 top-4 text-muted-foreground" /> */}
          </Card>
          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Withdrawn</CardDescription>
              <CardTitle className="text-4xl">
                {potentialIncome
                  ? `${currency} ${potentialIncome.toFixed(2)}`
                  : `$0.00`}
              </CardTitle>
              <small className="text-xs text-muted-foreground">
                For the year {currentYear}
              </small>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              This is how much you can close.
            </CardContent>
            {/* <DollarSign className="absolute right-4 top-4 text-muted-foreground" /> */}
          </Card>
          
          <Card className="flex-1 relative">
            <CardHeader>
              <CardTitle>Account Goals </CardTitle>
              <CardDescription>
                <p className="mt-2">
                  Reflects the number of goalls you want to own and
                  manage.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  
                  <span className="text-muted-foreground text-sm">
                    Goal: {agencyDetails.goal}
                  </span>
                </div>
                <Progress
                  value={(agencyDetails.goal) * 100}
                />
              </div>
            </CardFooter>
            <Goal className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
        </div>
       <div className="flex gap-4 xl:!flex-row flex-col">
          <Card className="flex-1 h-[800px]">
            <CardHeader>
              <CardTitle>Trading Charts</CardTitle>
            </CardHeader>
          <CardContent className=''>
          <Widget
          
          />
          </CardContent>
          </Card>
        
          <Card className="xl:w-[400px] w-full">
            <CardHeader>
              <CardTitle>Convers ions</CardTitle>
            </CardHeader>
            
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page