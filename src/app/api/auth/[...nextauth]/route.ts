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
import { authOptions } from "@/lib/auth";



// @ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
