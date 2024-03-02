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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import AdminBal from "@/components/forms/AdminBal";




const page = async () => {
  const authUser = await currentUser();
  if (!authUser) return null;

  const getAllDepo = await db.user.findMany({
    include: {
      balance: true, // Include the Balance relation
    },

    orderBy: {
      createdAt: "desc", // Order by createdAt in descending order to get the latest deposits first
    },

    
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
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p> All transactions made on this acccount</p>
              <Separator className="mt-5 mb-2" />
            </CardDescription>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">USER ID</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>AGENCY ID</TableHead>
                  {/* <TableHead>DATE</TableHead> */}
                  <TableHead className="text-right">PROFILE IMAGE</TableHead>
                  <TableHead className="text-right">USER DETAILS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getAllDepo.map((deposit) => (
                  <TableRow key={deposit.email}>
                    <TableCell className="font-medium">
                      {deposit.id.substring(0, 5)}
                    </TableCell>
                    <TableCell>{deposit.name}</TableCell>
                    <TableCell>${deposit.agencyId}</TableCell>
                    {/* <TableCell>{deposit.createdAt}</TableCell> */}
                    <TableCell className="">
                      <Image
                        src={deposit.avatarUrl}
                        alt="image"
                        width={30}
                        height={30}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger>
                          {" "}
                          <Button>
                            <Info />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle>Edit Balance </SheetTitle>
                          <p>User: {deposit.name} </p>
                      <p>Balance: {deposit.balance?.amount} USD</p>

                          <AdminBal userId={deposit.balance?.userId || ''} />


{/* {deposit.balance?.amount} */}
                            <SheetDescription>
                              
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                      {/* <Link href={`/admin/adminpage/${deposit.id}/userinfo`}> */}

                      {/* </Link> */}
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
