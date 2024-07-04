export default async function CreateUser(data: RegisterUser) {
    const res = await fetch('http://localhost:3000/api/users', {
        method: "POST",
        body: JSON.stringify(data)
    })

    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}