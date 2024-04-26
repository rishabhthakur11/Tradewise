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
import {
  getIndividualStock,
  getUserBalance,
  getUserPortfolio,
  placeOrder,
} from "@/http";
import StockType from "@/utils/interfaces/stockType";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/store/authContext";
import APIResponseType from "@/utils/interfaces/response";
import { PlaceOrderPopUp } from "./PlaceOrderPopUp";

type Stock = {
  stockName: string;
};

const formSchema = z.object({
  qty: z.coerce.number().positive({
    message: "Stock quantity must be a positive number.",
  }),
  amount: z.coerce.number().optional(),
  orderType: z.string().optional(),
  status: z.string().default("pending"),
});

function BuyStockForm({ stockName }: Stock) {
  const [stockData, setStockData] = useState<StockType>();
  const [userPortfolio, setUserPortfolio] = useState<any>();
  const [orderType, setOrderType] = useState<string>("limit");
  const { authState, balance, setBalance } = useAuth();
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [sellSuccess, setSellSuccess] = useState<boolean>(false);

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
  }, [stockName, purchaseSuccess, sellSuccess]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await getUserPortfolio({
          userID: authState.user?._id,
        });
        const { success }: APIResponseType = response;
        if (success) {
          setUserPortfolio(response.data);
        }
      } catch (error) {}
    };
    fetchStocks();
  }, [authState.user?._id, purchaseSuccess, sellSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qty: 0,
      amount: 0,
    },
  });

  const buyStock = async (values: z.infer<typeof formSchema>) => {
    const transactionType = "buy";
    const { qty } = values;
    const orderkaType = orderType;
    const userID = authState.user?._id;
    const symbol = stockName;
    let price = 0;
    if (orderType === "limit") {
      price = values.amount || 0;
    } else price = stockData?.lastPrice || 0;
    if (price === 0) return toast.error("Price cannot be zero");
    if (qty === 0) return toast.error("Quantity cannot be zero");
    if (balance < qty * price) return toast.error("Insufficient balance");

    try {
      const res = await placeOrder({
        userID,
        symbol,
        quantity: qty,
        price,
        orderType: orderkaType,
        transactionType,
      });

      const { success }: APIResponseType = res;
      if (success) {
        // toast.success(res.message);
        setPurchaseSuccess(true);
        //set the balance
        setBalance(balance - qty * price);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      form.reset();
    }
  };
  const sellStock = async (values: z.infer<typeof formSchema>) => {
    const transactionType = "sell";
    const { qty } = values;
    const orderkaType = orderType;
    const userID = authState.user?._id;
    const symbol = stockName;
    let price = 0;
    if (orderType === "limit") {
      price = values.amount || 0;
    } else price = stockData?.lastPrice || 0;
    if (price === 0) return toast.error("Price cannot be zero");
    if (qty === 0) return toast.error("Quantity cannot be zero");
    // check if user has enough stock to sell - TODO
    try {
      const res = await placeOrder({
        userID,
        symbol,
        quantity: qty,
        price,
        orderType: orderkaType,
        transactionType,
      });
      const { success }: APIResponseType = res;
      console.log(res);
      if (success) {
        toast.success(res.message);
        setSellSuccess(true);
        // push to other page
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      form.reset();
    }
  };
  const resetPurchaseSuccess = () => {
    setPurchaseSuccess(false);
    setSellSuccess(false);
  };

  return (
    <>
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
                {stockData ? formatPrice(stockData?.lastPrice) : ""}
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
                  <div className="flex items-center gap-x-5">
                    <Badge
                      variant={orderType === "limit" ? "default" : "secondary"}
                      className="my-5 cursor-pointer"
                      onClick={() => setOrderType("limit")}
                    >
                      Limit
                    </Badge>
                    <Badge
                      variant={orderType === "market" ? "default" : "secondary"}
                      className="my-5 cursor-pointer"
                      onClick={() => setOrderType("market")}
                    >
                      Market
                    </Badge>
                  </div>

                  {orderType === "limit" && (
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter price"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button type="submit">Buy Stock</Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-y-3">
              {orderType === "market" && (
                <p className="text-xs text-textGray">
                  Order will be executed at best price in the market
                </p>
              )}
              <p className="text-xs text-textGray">
                Balance: {formatPrice(balance)}
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {stockData ? stockData?.name : ""}
              </CardTitle>
              <CardDescription>
                {stockData ? formatPrice(stockData?.lastPrice) : ""}
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
                  <div className="flex items-center gap-x-5">
                    <Badge
                      variant={orderType === "limit" ? "default" : "secondary"}
                      className="my-5 cursor-pointer"
                      onClick={() => setOrderType("limit")}
                    >
                      Limit
                    </Badge>
                    <Badge
                      variant={orderType === "market" ? "default" : "secondary"}
                      className="my-5 cursor-pointer"
                      onClick={() => setOrderType("market")}
                    >
                      Market
                    </Badge>
                  </div>
                  {orderType === "limit" && (
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Enter Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter price"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button type="submit">Sell Stock</Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-y-3">
              <div>
                {orderType === "market" && (
                  <p className="text-xs text-textGray">
                    Order will be executed at best price in the market
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-xs text-textGray">
                  Balance: {formatPrice(balance)}
                </p>
                <p className="text-xs text-textGray">
                  Stock in Portfolio:
                  {userPortfolio?.find(
                    (stock: any) => stock.symbol === stockName
                  )?.shares || 0}
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {(purchaseSuccess || sellSuccess) && (
        <PlaceOrderPopUp
          isOpen={purchaseSuccess || sellSuccess}
          onClose={resetPurchaseSuccess}
        />
      )}
    </>
  );
}

export default BuyStockForm;
