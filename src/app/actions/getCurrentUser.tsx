import { getServerSession } from 'next-auth/next'

import { AuthOptions } from '@/pages/api/auth/[...nextauth]'
import { Prisma } from '@/app/libs/prismadb'
