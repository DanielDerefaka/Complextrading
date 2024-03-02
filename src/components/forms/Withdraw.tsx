"use client";

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Loading from "@/components/global/Loading";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Balance, Deposit, Withdraw } from "@prisma/client";
import { createDeposit, createWithdraw, getBalance } from "@/lib/queries";
import FileUpload from "@/components/global/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  data?: Partial<Withdraw>;
  bal?: Partial<Balance>
};

const FormSchema = z.object({
  amount: z
    .string()
    .min(2, { message: "Amount must be atleast 2 chars." }),
  walletAddress: z.string().min(1),
  
});




const WithdrawForm = ({data, bal}:Props) => {

  

  const { toast } = useToast();
  const router = useRouter();

  // const [deletingAgency, setDeletingAgency] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: data?.amount,
     
      walletAddress: data?.walletAddress,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      // let newUserData
      // let custId
      if (!data?.id) {
        const bodyData = {
          amount: values.amount,
         
          walletAddress: values.walletAddress,
        };
      }

      // newUserData = await co({role: "AGENCY_OWNER"})
      if (!data?.id) {
        await createWithdraw({
          id: data?.id ? data.id : v4(),
          amount: values.amount,
          walletAddress: values.walletAddress,
          status: "PENDING",
          createdAt: new Date(),
          userId: "",
        });

        toast({
          title: "Withdrawal Sucessful",
        });

        router.refresh();
      }

     
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "could not make a deposit",
      });
    }
  };
  const getbal = getBalance()
 

  

  return (
    
      <Card className="p-4 flex-1">
        <CardHeader>
          <CardTitle>Withdraw</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <p>
              {" "}
              To withdraw funds input your wallet address, please
              contact our support team to assist you with your deposit.
            </p>
            <Separator className="mt-5 mb-2" />
            <p> You may contact us via email at support@complextrading.com</p>
          </CardDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Amount in USD ($) </FormLabel>
                    <FormControl>
                      <Input required placeholder="Amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>USDT Wallet Address </FormLabel>
                    <FormControl>
                    <Input required placeholder="Wallet Address" {...field}  />
                      
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                



              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? (
                  <Loading />
                ) : (
                  "Save User Details"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
 
  )
}

export default WithdrawForm