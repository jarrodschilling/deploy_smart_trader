export default async function TestingDelete(prevState: any, formData: FormData) {
    const id = formData.get('id')

    console.log(`step 2: ${id}`)
    const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: "DELETE",
    })
    
    if (!res.ok) throw new Error("failed to fetch data")
    return res.json()
}