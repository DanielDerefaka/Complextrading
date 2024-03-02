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
import { Deposit } from "@prisma/client";
import { createDeposit } from "@/lib/queries";
import FileUpload from "@/components/global/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  data?: Partial<Deposit>;
};

const FormSchema = z.object({
  amount: z
    .string()
    .min(2, { message: "Agency name must be atleast 2 chars." }),
  crypto: z.string().min(1),
  proof: z.string().min(1),
});

const DepositForm = ({ data }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  // const [deletingAgency, setDeletingAgency] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: data?.amount,
      crypto: data?.crypto || 'USDT',
      proof: data?.proof,
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
          crypto: values.crypto || 'USDT',
          proof: values.proof,
        };
      }

      // newUserData = await co({role: "AGENCY_OWNER"})
      if (!data?.id) {
        await createDeposit({
          id: data?.id ? data.id : v4(),
          amount: values.amount,
          crypto: values.crypto || 'USDT',
          proof: values.proof,
          status: "PENDING",
          createdAt: new Date(),
          userId: "",
        });

        toast({
          title: "Deposit Sucessful",
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

  return (
  
        <Card className="p-4 flex-1">
          <CardHeader>
            <CardTitle>Deposit</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>
                {" "}
                To deposit funds with a payment method not listed here, please
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
                  name="crypto"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Crypto Currency </FormLabel>
                      <FormControl>
                      <Input required placeholder="USDT" {...field}  />
                        
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  


                {/* {'crypto' !== 'usdt' ? '' : ''} */}

                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="proof"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Screenshot of Payment </FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="avatar"
                          value={field.value}
                          onChange={field.onChange}
                        />
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
    
  );
};

export default DepositForm;
