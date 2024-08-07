export default async function GetTokenByIdentifier(identifier: string) {
    
    const res = await fetch(`http://localhost:3000/api/verification-tokens/${identifier}`, {
        method: "GET",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}