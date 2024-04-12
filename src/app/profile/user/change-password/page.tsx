"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const formSchema = z.object({
  oldPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
function changePassword() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = values;
        if (!oldPassword || !newPassword || !confirmPassword)
            return toast.error("Please fill all the fields");
    
        if (newPassword !== confirmPassword)
            return toast.error("Passwords do not match");
    
        // Call the login api
        // const res = await userlogin({ email, password });
        // const { success }: APIResponseType = res;
    
        // if (success) {
        toast.success("Password changed successfully");
        // set the user in context
        // setAuthenticatedState({
        //   isAuthenticated: true,
        //   user: res.data,
        // });
        // }
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full h-fit border bg-white rounded-md">
      <div className="p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input placeholder="old password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-end"></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Password</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default changePassword;
