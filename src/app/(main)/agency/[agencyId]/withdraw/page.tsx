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
import { v4 } from "uuid";

import { createDeposit, createWithdraw, getBalance } from "@/lib/queries";
import FileUpload from "@/components/global/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import WithdrawForm from "@/components/forms/Withdraw";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import Link from "next/link";

const Withdraw = async ({
  params,
}: {
  params: { agencyId: string };
  searchParams: { code: string };
}) => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const getBalance = await db.balance.findUnique({
    where: {
      userId: authUser.id,
    },
  });

  if (!getBalance) return null;

  // const agencyDetails = await db.user.findUnique({
  //   where: {
  //     id:authUser.agencyId
  //   }
  // })

  return (
    <div className="h-full relative">
      <div className="flex gap-4 xl:!flex-row flex-col">
        <Card className="xl:w-[400px] w-full  h-[200px]">
          <CardHeader>
            <CardDescription>Balance</CardDescription>
            <CardTitle className="text-4xl mb-5">
              {" "}
              ${getBalance.amount}.00
            </CardTitle>

            <Separator className="" />

            <div className="flex flex-col gap-4 xl:flex-row mt-5">
              <Link href="#">
                <Button>
                  <CrossIcon />
                  <span className="ml-2">Deposit</span>
                </Button>
              </Link>

              <Link href="#">
                <Button className="bg-red-500 hover:bg-none">
                  <Wallet />
                  <span className="ml-2">Withdraw</span>
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
        <WithdrawForm />
      </div>
    </div>
  );
};

export default Withdraw;
