"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { use, useEffect, useState } from "react"
import * as XLSX from "xlsx"
import CreateBulkTransactions from "@/services/createBulkTransactions"
import { AddTransactionFormData } from "../../../../types"
import GetUserByEmail from "@/services/getUserByEmail"

export default function ExcelUpload() {
    const [file, setFile] = useState<File|null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [dbUserId, setDbUserId] = useState("")
    const { data: session, status } = useSession()

    useEffect(() => {
        setLoading(true)
        const fetchUserId = async () => {
            const userEmail = session?.user?.email
            const response = await GetUserByEmail(userEmail)
            setDbUserId(response.id)
        }
        fetchUserId()
        setLoading(false)
    }, [])

    function saveData () {
        if(file) {
            setLoading(true)
            const reader = new FileReader()
            reader.onload = async (e) => {
                const data = e.target?.result
                if(data) {
                    const workbook = XLSX.read(data, {type: "binary"})
                    // SheetName
                    const sheetName = workbook.SheetNames[0]
                    // Worksheet
                    const workSheet = workbook.Sheets[sheetName]
                    // JSON
                    const transactions:AddTransactionFormData[] = XLSX.utils.sheet_to_json(workSheet, { raw: false })
                    // setJsonData(JSON.stringify(json, null, 2))
                    const processedTransactions = transactions.map((transaction: any) => {
                        if (transaction.date) {
                            transaction.date = new Date(transaction.date).toISOString().split('T')[0]
                        }
                        if (transaction.shares) {
                            // Convert Shares to integer
                            transaction.shares = parseInt(transaction.shares, 10);
                        }
                        if (transaction.price) {
                            // Convert Price to integer (or float if needed)
                            transaction.price = parseFloat(transaction.price);
                        }
                        if (transaction.closeTrade) {
                            // Convert string to boolean
                            transaction.closeTrade = transaction.closeTrade.toLowerCase() === 'true';
                        }
                        if (transaction.openTrade) {
                            // Convert string to boolean
                            transaction.openTrade = transaction.openTrade.toLowerCase() === 'true';
                        }
                        // @ts-ignore
                        const userIdData = dbUserId
                        const updatedTransaction = {...transaction, userId:userIdData}

                        return updatedTransaction
                    })
                    // Save to DB
                    await CreateBulkTransactions(processedTransactions)
                    setLoading(false)
                    router.push('/transactions')
                }
            }
            reader.readAsBinaryString(file)
        }
    }
    
    return (
        <div className="flex justify-center mx-auto mt-20">
        <div className="border-2 border-slate-200 bg-black rounded-md w-1/3 flex justify-center mt-10">
        <div className="w-full max-w-lg p-8">
        <div className="">
            <h1 className="text-3xl font-bold text-slate-200 mb-2">Upload Excel File</h1>
            
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3">
                {/* <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="fileName">
                    <button className="bg-gray-500 hover:bg-blue-700 text-white mr-4 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Choose File...</button></label> */}
                <input 
                    className="block w-full text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    accept=".xls,.xlsx"
                    name="fileName"
                    id="fileName"
                    placeholder="No file chosen"
                    onChange={(e) => setFile(e.target.files?e.target.files[0]:null)}
                />
                </div>
            </div>
                <button 
                    className="mb-6 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit"
                    onClick={saveData}>
                        Upload
                </button>
                
                
            </div>
            </div>
        </div>
        </div>
    )
}
