"use client"

export default function ErrorBoundary({ 
        error,
        reset,
    }: {
        error: Error;
        reset: () => void
    }) {
    return (
        <>
            {error.message} <button onClick={reset}>Try Again</button>
        </>
    )
}