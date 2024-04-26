import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { addUserBalance } from "@/http";
import APIResponseType from "@/utils/interfaces/response";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
});

export function AddMoney({
  id,
  balance,
  setBalance,
}: {
  id: string;
  balance: number;
  setBalance: (balance: number) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const amount = values.amount;
      // Check if amount is a valid number
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Amount must be a valid positive number.");
      }

      // Call the deposit api
      const res = await addUserBalance({ _id: id, amount });
      const { success }: APIResponseType = res;
      if (success) {
        toast.success(res.message);
        // Notify parent component about the updated balance
        setBalance(res.data.balance);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      form.reset();
    }
  };
  const handleBadgeClick = (amountToAdd: number) => {
    const currentAmount = form.getValues("amount");

    if (!isNaN(currentAmount)) {
      const newAmount = currentAmount + amountToAdd;

      form.setValue("amount", newAmount);
    }
  };
  return (
    <Tabs defaultValue="deposit" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="deposit">
        <Card>
          <CardHeader>
            <CardTitle>Deposit Money</CardTitle>
            <CardDescription>
              Add money to your wallet using any UPI app.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-start items-center gap-x-5">
                  <Badge
                    variant="secondary"
                    className="my-5 cursor-pointer"
                    onClick={() => handleBadgeClick(100)}
                  >
                    + 100
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="my-5 cursor-pointer"
                    onClick={() => handleBadgeClick(500)}
                  >
                    + 500
                  </Badge>
                </div>
                <Button type="submit">Deposit Money</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="withdraw">
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Money</CardTitle>
            <CardDescription>
              Withdraw money from your wallet to your bank account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Feature not implemented yet */}
            <CardDescription>Feature not implemented yet</CardDescription>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
