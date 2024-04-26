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
import { userlogin } from "@/http";
import { useAuth } from "@/store/authContext";
import APIResponseType from "@/utils/interfaces/response";
import { LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
function Login() {
  const { setAuthenticatedState } = useAuth();
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
      const { email, password } = values;
      if (!email || !password) return toast.error("Please fill all the fields");

      // Call the login api
      const res = await userlogin({ email, password });
      const { success }: APIResponseType = res;

      if (success) {
        toast.success(res.message);
        // set the user in context
        setAuthenticatedState({
          isAuthenticated: true,
          user: res.data,
        });
        router.replace("/stocks/user/explore");
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Link href="/auth/forgetpassword">Forget Password?</Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-1/4">
            <LogIn className="mr-2 h-4 w-4" />
            Log In
          </Button>
          <p className="flex items-center justify-center text-gray-600">
            <span className="flex-1 border-t border-gray-300 mr-2"></span>
            <span>OR</span>
            <span className="flex-1 border-t border-gray-300 ml-2"></span>
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
