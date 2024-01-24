import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/Components/Navbar/Navbar'

import RegisterModal from '@/app/Components/Modals/RegisterModal'
import LoginModal from '@/app/Components/Modals/LoginModal'
import RentModal from '@/app/Components/Modals/RentModal'
import SearchModal from './Components/Modals/SearchModal'

// 讓 ToasterProvider 可以全局使用
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

// 設定字型
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Aibnb clone'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  )
}
