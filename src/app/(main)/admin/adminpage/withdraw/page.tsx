import React from "react";
import { Deposit } from "@prisma/client";
import { getAllDepo } from "@/lib/queries";
import UserDetails from "@/components/global/UserDetails";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import TransactionHistory from "@/components/forms/TransactionHistory";
import AgencyDetails from "@/components/forms/AgencyDetails";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CrossIcon, Info, Wallet } from "lucide-react";
import { v4 } from "uuid";
import Image from "next/image";
import Link from "next/link";

const page = async () => {

  
  const authUser = await currentUser();
  if (!authUser) return null;

  const getAllDepo = await db.withdraw.findMany({
   where:{
    status: 'PENDING'
   }
   
    
  });

  if (!getAllDepo) return null;

  return (
    <div className="h-full relative">
      <div className="flex gap-4 xl:!flex-row flex-col">
        {/* <Card className="xl:w-[400px] w-full  h-[200px]">
          <CardHeader>
            <CardDescription>Balance</CardDescription>
            <CardTitle className="text-4xl mb-5">$0.00</CardTitle>

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
        </Card> */}
        <Card className="p-4 flex-1">
          <CardHeader>
            <CardTitle>Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {/* <p> All transactions made on this acccount</p> */}
              <Separator className="mt-5 mb-2" />
            </CardDescription>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"> ID</TableHead>
                  <TableHead>USER ID</TableHead>
                  <TableHead>AMOUNT ID</TableHead>
                  {/* <TableHead>DATE</TableHead> */}
                  {/* <TableHead className="text-right">PROOF</TableHead> */}
                  <TableHead className="text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getAllDepo.map((deposit) => (
                  <TableRow key={deposit.id}>
                    <TableCell className="font-medium">
                      {deposit.id.substring(0, 5)}
                    </TableCell>
                    <TableCell>{deposit.userId}</TableCell>
                    <TableCell>${deposit.amount}</TableCell>
                    {/* <TableCell>{deposit.createdAt}</TableCell> */}
                    {/* <TableCell className="">
                     <Image src={deposit.proof} alt="image" width={30} height={30}/>
                    </TableCell> */}
                    <TableCell className="text-right">
                    
                    {deposit.status}
                
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          
        </Card>
      </div>
    </div>
  );
};

export default page;
