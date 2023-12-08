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

    // 在 terminal 出現前端不能出現 schema 的 DateTime type 的錯誤(影片) 所以這裡回傳給前端把日期的格式改成這樣
    return {
      ...currentUser,
      createAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updateAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    }
  } catch (error: any) {
    return null
  }
}
