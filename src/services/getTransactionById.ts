export default async function GetTransactionById(id: string) {
    
    const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: "GET",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}