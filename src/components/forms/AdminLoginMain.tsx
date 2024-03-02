"use client"

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLogin } from "@/lib/queries";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Admin } from "@prisma/client";

type Props = {
  data?: Partial<Admin>;
};

const FormSchema = z.object({
  email: z.string().email("Invalid email").min(1),
  password: z.string().min(1),
});

const AdminLoginFormMain = ({ data }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: data?.email,
      password: data?.password,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await adminLogin({
          email: values.email,
          password: values.password,
        
          
      });

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      // Redirect to dashboard or any other page after successful login
      router.push("admin/adminpage/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Login Admin</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input required type="email" placeholder="Email" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input required type="password" placeholder="Password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminLoginFormMain;
