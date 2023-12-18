'use client'

import dynamic from 'next/dynamic'

import useRentModal from '@/app/hooks/useRentModal'

import Modal from './Modal'
import Heading from '../Heading'
import CategoryInput from '../Inputs/CategoryInput'
import CountrySelect from '../Inputs/CountrySelect'
import Map from '../../Components/Map'

import { useForm, FieldValues } from 'react-hook-form'
import { useMemo, useState } from 'react'

import { categories } from '../Navbar/Categories'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  /** 監聽目前的值(可以做是否被選取的判斷) */
  const category: string = watch('category')
  const location: any = watch('location')

  const setCustomValue = (id: string, value: any) => {
    // console.log(id)
    console.log(value)
    // 因為 react-hook-form 的 setValue 不會重新渲染頁面，因此包在 function 裡面
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const onBack = () => {
    setStep((preV) => preV - 1)
  }

  const onNext = () => {
    setStep((preV) => preV + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  /**
   * 動態引入 Map 元件 (不然會出現 window is not defined 神奇的錯誤)
   * 引入一定要放在 functional component 裡，不然修改此元件儲存會顯示已經載入過 Map 元件的錯誤(畫面直接死)
   */
  const DynamicMap = dynamic(() => import('../Map'))

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div
        className='
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        '
      >
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div
        className='
    flex flex-col gap-8
    '
      >
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <DynamicMap center={location?.latlng} />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Airbnb your house'
      body={bodyContent}
    />
  )
}

export default RentModal
