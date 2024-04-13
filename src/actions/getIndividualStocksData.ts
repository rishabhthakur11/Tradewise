import { getIndividualStock } from "@/http";

export default async function getIndividualStocksData(stock: string) {
    try {
      const response = await getIndividualStock(stock);
      return response.data;
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
    return {};
  }