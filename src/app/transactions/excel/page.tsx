"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"


export default function ExcelUpload() {
    
    return (
        <div className="flex justify-center mx-auto mt-20">
        <div className="border-2 border-slate-200 bg-black rounded-md w-1/3 flex justify-center mt-10">
        <div className="w-full max-w-lg p-8">
        <form className="">
            <h1 className="text-3xl font-bold text-slate-200 mb-2">Upload Excel File</h1>
            
            <div className="flex flex-wrap -mx-3 mb-6 mt-6">
                <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-slate-200 text-sm font-bold mb-2" htmlFor="password">
                    <button className="bg-gray-500 hover:bg-blue-700 text-white mr-4 font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline">Search for file...</button></label>
                <input 
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    name="fileName"
                    id="fileName"
                />
                </div>
            </div>
                <button 
                    className="mb-6 w-44 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit">
                        Upload
                </button>
                
                
            </form>
            </div>
            
        </div>
        </div>
    )
}
