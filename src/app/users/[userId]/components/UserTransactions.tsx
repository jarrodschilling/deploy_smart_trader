type Props = {
    promise: Promise<Transaction[]>
}

import React from 'react'

export default async function UserTransactions({ promise }: Props) {
    const transactions = await promise
    const content = transactions.map(transaction => {
        return(
            <article key={transaction.id}>
                <h1>{transaction.title}</h1>
                <p>{transaction.body}</p>
                <br />

            </article>
        )
    })
  return content
}
