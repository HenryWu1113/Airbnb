'use client'

import Container from '@/app/Components/Container'
import Logo from '@/app/Components/Navbar/Logo'
import Search from '@/app/Components/Navbar/Search'
import UserMenu from '@/app/Components/Navbar/UserMenu'
import Categories from '@/app/Components/Navbar/Categories'
import React from 'react'

// 有 run 過 npx prisma db push 會在這裡有 schema 的 type 定義可以用(後來因為 User 有 DateTime 的 type 所以前端不試用，另調整成下面的 type)
import { User } from '@prisma/client'
import { SafeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // console.log(currentUser)
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
