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
import logo from "../../../../public/logo/logo_transparent.png";
import Image from "next/image";
import GoogleAuth from "@/components/socialAuthButtons/GoogleAuth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Login Logic");
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-2/3 h-2/3 px-10 pb-4 pt-6 bg-white rounded-lg p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Link href="/">
            <div className="flex items-center gap-x-2">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="Tradewise"
                priority
              />
            </div>
          </Link>
          <h3 className="text-xl font-semibold">Login to Tradewise</h3>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription className="flex justify-end">
                  <Button variant="link">Forget Password?</Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Log In</Button>
          <p className="flex items-center justify-center text-gray-600">
            <span className="flex-1 border-t border-gray-300 mr-2"></span>{" "}
            {/* Horizontal line on the left */}
            <span>OR</span>
            <span className="flex-1 border-t border-gray-300 ml-2"></span>{" "}
            {/* Horizontal line on the right */}
          </p>
        </form>
      </Form>
      <div className="flex justify-center mt-5">
        <GoogleAuth />
      </div>
      <div className="text-sm font-medium text-textGray mt-5">
        Not Registered ?
        <Button onClick={() => router.push("/auth/signup")} variant="link">
          Create Account
        </Button>
      </div>
    </div>
  );
}

export default Login;
