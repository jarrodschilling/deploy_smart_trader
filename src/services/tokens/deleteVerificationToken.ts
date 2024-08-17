export default async function DeleteVerificationToken(token: string, identifier: string) {

    const res = await fetch(`http://localhost:3000/api/tokens/${token}/${identifier}`, {
        method: "DELETE",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    
    return res.json()
}