import { Resend } from 'resend'
import { app_domain } from './domain'

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = `${app_domain}`

export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmationLink = `${domain}/verify-email?token=${token}`
    
    await resend.emails.send({
        from: "tradestatspro@jarrodschilling.com",
        to: email,
        subject: "Trade Stats Pro: verify your email",
        html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`
    })
}