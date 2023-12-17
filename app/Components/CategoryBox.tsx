'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected
}) => {
  const router = useRouter()
  const params = useSearchParams()

  /** 點擊分類 */
  const handleClick = useCallback(() => {
    let currentQuery = {}

    // 透過套件把目前的路由參數變成物件
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    // 更新查詢參數，保留原本並加上目前點到的分類
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    // 如果點到的分類跟目前路由參數一樣，變成取消選取
    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    // 在透過套件把這個物件變成路由參數
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    // 前往該網址
    router.push(url)
  }, [label, router, params])

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  )
}

export default CategoryBox
