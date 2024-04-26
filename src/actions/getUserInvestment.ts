import { getUserInvestments } from "@/http";

export default async function getUserInvestment(userId: string) {
    try {
        const res = await getUserInvestments({ userId });
        return res.data;

    } catch (error) {

        console.error("Error fetching user investment:", error);
    }
}