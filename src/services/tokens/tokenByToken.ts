export default async function GetTokenByToken(token: string) {
    
    const res = await fetch(`http://localhost:3000/api/tokens/${token}`, {
        method: "GET",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}