import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../libs/primadb"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
        adapter: PrismaAdapter(prisma),
        providers: [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
          CredentialsProvider({
              name: 'credentials',
              credentials:{
                  email: {
                      label: "Email",
                      type: "text",
                  },
                  password: {
                      label: "Password",
                      type: "password",
                  },
              },
              async authorize(credentials){
                  if(!credentials?.email || !credentials?.password){
                      throw new Error("Email o contraseña incorrecta");
                  }
      
                  const user = await prisma.user.findUnique({
                      where:{
                          email: credentials.email,
                      }
                  })
      
                  if(!user || !user?.hashPassword){
                      throw new Error("Email o contraseña incorrecta");
                  }
      
      
                  const isCorrectPassword = await bcrypt.compare(
                      credentials.password,
                      user.hashPassword
                  )
      
                  if(!isCorrectPassword){
                      throw new Error("Email o contraseña incorrecta");
                  }
      
                  return user;
              },
          }),
        ],
        pages: {
          signIn: '/login'
        },
        debug: process.env.NODE_ENV === "development",
        session:{
          strategy: "jwt",
        },
        secret: process.env.NEXTAUTH_SECRET
      }

export default NextAuth(authOptions)