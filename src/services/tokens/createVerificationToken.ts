

export default async function CreateVerificationToken(data: any) {
    console.log(`Step 2: ${data.identifier}`)
    const res = await fetch('http://localhost:3000/api/tokens', {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}