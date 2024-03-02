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

const page = () => {
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
              {/* ${getBalance.amount}.00 */}
              0
            </CardTitle>
            <small className="text-xs text-muted-foreground">
              For the year 
            </small>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Total Balance for this account dashboard.
          </CardContent>
          <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
        </Card>
        <Card className="flex-1 relative">
          <CardHeader>
            <CardDescription>Withdrawn</CardDescription>
            <CardTitle className="text-4xl">
            $0.00
            </CardTitle>
            <small className="text-xs text-muted-foreground">
              For the year 
            </small>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This is how much you can close.
          </CardContent>
          <DollarSign className="absolute right-4 top-4 text-muted-foreground" />
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
                  Goal: 5
                </span>
              </div>
              <Progress
                value={(5) * 100}
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
        <CardContent className='hidden xl:flex'>
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

export default page