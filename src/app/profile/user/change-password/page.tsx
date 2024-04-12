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
import { useAuth } from "@/store/authContext";
import { changeUserPassword } from "@/http";
import APIResponseType from "@/utils/interfaces/response";

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
function ChangePassword() {
  const { authState, setAuthenticatedState } = useAuth();
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
      const id = authState.user?._id;
      // Call the login api
      const res = await changeUserPassword({
        _id: id as string,
        password: oldPassword,
        newPassword,
      });
      const { success }: APIResponseType = res;

      if (success) {
        toast.success("Password changed successfully");
        // reset the form
        form.reset();
      } else {
        toast.error("Something went wrong");
        form.reset();
      }
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

export default ChangePassword;
