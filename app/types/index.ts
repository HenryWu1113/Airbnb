import { User, Listing } from '@prisma/client'

/* 第一個參數是傳入的 Type, 第二個參數是要忽略的欄位，
並會回傳一個新的 Type, 這是 TypeScript Utility Types 的標準用法。 */

/** SafeUser 是 prisma/client 自動生成的 type，因為 'createdAt' | 'updatedAt' | 'emailVerified' 這三個的 type 前端沒有，必須做修改成前端存在的 type，因此變更。 */
export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string
}
