'use client'

// 有 run 過 npx prisma db push 會在這裡有 schema 的 type 定義可以用
import { User } from '@prisma/client'

import Container from '@/app/Components/Container'
import Logo from '@/app/Components/Navbar/Logo'
import Search from '@/app/Components/Navbar/Search'
import UserMenu from '@/app/Components/Navbar/UserMenu'
import React from 'react'

interface NavbarProps {
  currentUser?: User | null
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
