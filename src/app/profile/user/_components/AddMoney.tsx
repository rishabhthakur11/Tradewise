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

const formSchema = z.object({
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
});

export function AddMoney() {
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

      console.log("Money Added");
      console.log(typeof values.amount);
      toast.success("Money Added");
      // form to default values
      form.reset();
    } catch {
      toast.error("Something went wrong");
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
            <CardTitle>Add Money</CardTitle>
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
                      <FormDescription className="flex justify-start">
                        Enter valid amount
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
