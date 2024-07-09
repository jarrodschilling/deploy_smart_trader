import NextAuth from "next-auth/next";
import db from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session, User} from "next-auth"
import { signIn } from "next-auth/react";
import GetUserByEmail from "@/services/getUserByEmail";
import CreateUser from "@/services/createUser";
import { Adapter } from "next-auth/adapters";
import bcrypt from 'bcrypt'



export const authOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
        name: "credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email" },
          password: { label: "Password", type: "password", placeholder: "password" }
        },
        async authorize(credentials) {
          
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter email and password')
          }

          const user = await GetUserByEmail(credentials?.email)

          if (!user || !user?.password) {
            throw new Error('No user found')
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password)

          if (!passwordMatch) {
            throw new Error('Incorrect password')
          }

          return user
        }
      })
    ],
    secret: process.env.SECRET,
    session: {
      strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
    // callbacks: {
    //   async session({session}) {
    //     const emailCheck = await session.user.email
    //     const sessionUser = await GetUserByEmail(emailCheck)

    //     session.user.id = sessionUser.id
    //     return session
    //   },
    //   async signIn({profile}) {
        
    //     try {
    //       const emailCheck = await profile.email
          
    //       const userEmail = await GetUserByEmail(emailCheck)

    //       if(!userEmail) {
    //         const newUser = {
    //           firstName: profile.name,
    //           lastName: profile.name,
    //           email: profile.email,
    //           userName: profile.email,
    //           password: "test123"
    //         }
    //         const user = await CreateUser(newUser)
    //       }
    //       return true

    //     } catch (error) {
    //       console.log(error)
    //       return false
    //     }
    //   }
    // }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
