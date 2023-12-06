import { getServerSession } from 'next-auth/next'

import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import prisma from '../../app/libs/prismadb'

// 影片說這不是一支 api 所以不回傳錯誤改回傳 null
export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      }
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error: any) {
    return null
  }
}
