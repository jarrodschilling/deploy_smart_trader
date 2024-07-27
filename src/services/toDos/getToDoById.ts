export default async function GetToDoById(id: string) {
    // console.log(`step 2: ${id}`)
    const res = await fetch(`http://localhost:3000/api/toDos/${id}`, {
        method: "GET",
    })


    if (!res.ok) throw new Error("failed to fetch data")
    // console.log(res)
    return res.json()
}