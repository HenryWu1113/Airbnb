import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from '@/app/Components/Navbar/Navbar'
import RegisterModal from '@/app/Components/Modals/RegisterModal'
import LoginModal from '@/app/Components/Modals/LoginModal'
// 讓 ToasterProvider 可以全局使用
import ToasterProvider from './providers/ToasterProvider'

// 設定字型
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Aibnb clone'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
