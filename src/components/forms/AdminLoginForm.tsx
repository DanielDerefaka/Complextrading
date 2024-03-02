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
import { Admin, Deposit } from "@prisma/client";
import { createAdmin, createDeposit } from "@/lib/queries";
import FileUpload from "@/components/global/file-upload";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  data?: Partial<Admin>;
};

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Agency name must be atleast 2 chars." }),
  email: z.string().min(1),
  password: z.string().min(1),
});

const AdminLoginForm = ({ data }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  // const [deletingAgency, setDeletingAgency] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      password: data?.password,
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
          name: values.name,
          email: values.email,
          password: values.password,
        };
      }

      // newUserData = await co({role: "AGENCY_OWNER"})
      if (!data?.id) {
        await createAdmin({
          id: data?.id ? data.id : v4(),
          name: values.name,
          email: values.email || 'USDT',
          password: values.password,
          createdAt: new Date(),
         
        });

        toast({
          title: "Admin Created Sucessful",
        });

        router.refresh();
      }

     
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Oppse!",
        description: "could not create Admin",
      });
    }
  };

  return (
  
        <Card className="p-4 flex-1">
          <CardHeader>
            <CardTitle>Create Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>
                {" "}
               
              </p>
             
            </CardDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Admin Name </FormLabel>
                      <FormControl>
                        <Input required placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email </FormLabel>
                      <FormControl>
                      <Input required type="email" placeholder="Emaill" {...field}  />
                        
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  


                {/* {'crypto' !== 'usdt' ? '' : ''} */}

                <FormField
                  disabled={form.formState.isSubmitting}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password </FormLabel>
                      <FormControl>
                      <Input required placeholder="Password" {...field}  />
                        
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? (
                    <Loading />
                  ) : (
                    "Register Admin"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    
  );
};

export default AdminLoginForm;
