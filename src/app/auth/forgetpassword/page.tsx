"use client";
import React from "react";
import {
  Form,
  FormControl,
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
import logo from "../../../../public/logo/logo_transparent.png";
import Image from "next/image";
import { Mail } from "lucide-react";
import { userforgotPassword } from "@/http";
import APIResponseType from "@/utils/interfaces/response";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});
function ForgetPassword() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email } = values;
      if (!email) return toast.error("Please fill the email");
      // Call the login api
      const res = await userforgotPassword({ email });
      const { success }: APIResponseType = res;
      if (success) {
        toast.success(res.message);
        router.push("/auth/otp");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full md:w-2/3 h-fit  md:h-2/3 px-10 md:pb-4 md:pt-6 bg-white rounded-lg p-6 mt-10 md:mt-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Link href="/">
            <div className="flex items-center">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="Tradewise"
                priority
              />
            </div>
          </Link>
          <h3 className="text-xl font-semibold">Forget Password</h3>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <Mail className="mr-2 h-4 w-4" />
            Send OTP
          </Button>
        </form>
      </Form>
      <div className="text-sm font-medium text-textGray mt-10">
        Already have an account?
        <Button onClick={() => router.push("/auth/login")} variant="link">
          Login
        </Button>
      </div>
    </div>
  );
}

export default ForgetPassword;
