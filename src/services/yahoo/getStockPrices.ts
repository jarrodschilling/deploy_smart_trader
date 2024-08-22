import { app_domain } from "@/lib/domain"


export default async function getStockName(stockTicker: string) {
    const res = await fetch(`${app_domain}/api/yfQuote/${stockTicker}`,
        {mode: 'no-cors'}
    )
    
    if (!res.ok) throw new Error("failed to fetch data")
        // if (!res.ok) {
        //     return false
        // }
    return res.json()
}
