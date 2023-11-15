import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        // 如果登入中沒有信箱或密碼 丟錯誤
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        // 找 user email 等於登入的 email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        // 沒有使用者或使用者沒有密碼 丟錯誤
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        // 比對輸入的密碼加密後是否符合資料庫儲存的加密密碼
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        // 比對密碼不一樣就丟錯誤
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
