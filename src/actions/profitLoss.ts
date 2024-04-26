import { getIndividualStock } from "@/http";

const calculateProfitLoss = async (transactions: any) => {
    let totalProfitLoss = 0;
    const promises = [];

    // Fetch latest stock prices for all symbols in parallel
    for (const transaction of transactions) {
        const { symbol, price, quantity } = transaction;
        promises.push(getIndividualStock(symbol));
    }

    const latestPrices = await Promise.all(promises);

    // Calculate profit or loss
    for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];
        const latestPrice = latestPrices[i].data.lastPrice;
        const currentTotalPrice = latestPrice * transaction.quantity;
        const purchaseTotalPrice = transaction.price * transaction.quantity;
        const profitLoss = currentTotalPrice - purchaseTotalPrice;
        totalProfitLoss += profitLoss;
    }

    return totalProfitLoss;
};

export default calculateProfitLoss;