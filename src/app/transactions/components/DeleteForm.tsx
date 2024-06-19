'use client'

import DeleteTransaction from "@/services/deleteTransaction"
import TestingDelete from "@/services/testingDelete"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
    message:null
}

function DeleteButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Delete
        </button>
    )
}

export function DeleteForm({ id }: { id: string}) {
    const [state, formAction] = useFormState(TestingDelete, initialState)

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <DeleteButton />
        </form>
    )
}