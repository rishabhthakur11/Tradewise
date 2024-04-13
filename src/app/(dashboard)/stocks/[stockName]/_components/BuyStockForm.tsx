"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatPrice } from "@/lib/format";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getIndividualStock } from "@/http";
import StockType from "@/utils/interfaces/stockType";

type Stock = {
  stockName: string;
};

const formSchema = z.object({
  qty: z.coerce.number().positive({
    message: "Stock quantity must be a positive number.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
});

function BuyStockForm({ stockName }: Stock) {
  const [stockData, setStockData] = useState<StockType>();

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        const response = await getIndividualStock(stockName);
        setStockData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [stockName]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qty: 0,
      amount: 0,
    },
  });

  const buyStock = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.success("Stock bought successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      form.reset();
    }
  };
  const sellStock = async (values: z.infer<typeof formSchema>) => {
    try {
      toast.success("Stock sold successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      form.reset();
    }
  };

  return (
    <Tabs defaultValue="buy" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="buy">BUY</TabsTrigger>
        <TabsTrigger value="sell">SELL</TabsTrigger>
      </TabsList>
      <TabsContent value="buy">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {stockData ? stockData?.name : ""}
            </CardTitle>
            <CardDescription>
              {stockData ? formatPrice(stockData?.price) : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(buyStock)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="qty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Quantity</FormLabel>
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
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter amount</FormLabel>
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
                <Button type="submit">Buy Stock</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sell">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {stockData ? stockData?.name : ""}
            </CardTitle>
            <CardDescription>
              {stockData ? formatPrice(stockData?.price) : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(sellStock)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="qty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Quantity</FormLabel>
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
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter amount</FormLabel>
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
                <Button type="submit">Sell Stock</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default BuyStockForm;
