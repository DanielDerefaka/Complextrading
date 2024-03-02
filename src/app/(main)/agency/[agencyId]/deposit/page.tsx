

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CrossIcon, Wallet } from "lucide-react";


import DepositForm from "@/components/forms/DepositForm";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";




const Deposit = async () => {
  
  const authUser = await currentUser();
  if (!authUser) return null;

  const getBalance = await db.balance.findUnique({
    where: {
      userId: authUser.id,
    },
  
  });

  if (!getBalance) return null;


  return (
    <div className="h-full relative">
      <div className="flex gap-4 xl:!flex-row flex-col">
        <Card className="xl:w-[400px] w-full  h-[200px]">
          <CardHeader>
            <CardDescription>Balance</CardDescription>
            <CardTitle className="text-4xl mb-5">${getBalance.amount}.00</CardTitle>

            <Separator className="" />

            <div className="flex flex-col gap-4 xl:flex-row mt-5">
              <Button>
                <CrossIcon />
                <span className="ml-2">Deposit</span>
              </Button>

              <Button className="bg-red-500 hover:bg-none">
                <Wallet />
                <span className="ml-2">Withdraw</span>
              </Button>
            </div>
          </CardHeader>
        </Card>
      <DepositForm/>
      </div>
    </div>
  );
};

export default Deposit;
