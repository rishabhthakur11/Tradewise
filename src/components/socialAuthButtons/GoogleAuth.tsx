import React from "react";
import { Google } from "@mui/icons-material";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { googleAuth } from "@/http";
import { useRouter } from "next/navigation";

export default function GoogleAuth() {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const res = await googleAuth();
      const { success }: any = res;
      if (success) {
        toast.success("Login successfully");
        router.push("/stocks/user/explore");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <Button onClick={handleLogin}>
        <Google fontSize="small" className="mr-2" /> Login with Google
      </Button>
    </div>
  );
}
