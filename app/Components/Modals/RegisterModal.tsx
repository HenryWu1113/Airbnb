'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useState, useCallback } from 'react'
// FieldValues 是定義 key 是字串 value 可以隨便型態
// SubmitHandler 是定義 sumbit function 型別
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'

import Modal from './Modal'
import Heading from '../Heading'
import Input from '../Inputs/Input'

import { toast } from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  // 從 useForm 解構
  // register 驗證內容(放在 input select)
  // handleSubmit 執行後會先去驗證 register 的驗證內容 無誤後才會執行包在裡面的 function
  // formState: { errors } 是可以知道該 input 是否符合驗證(這裡需要是可以在 input 的 class 做判斷)
  // errors 是一個物件 errors[id] 可得知是否通過 register 驗證內容 => {...register(id, { required })}
  // defaultValues 有加沒加一樣 主要看你所有 input 的 {...register(id, { required })} 的 id 有哪些

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Success!')
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => {
        console.log(error)
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  /** 跳轉登入畫面 */
  const toggle = useCallback(() => {
    loginModal.onOpen()
    registerModal.onClose()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className='
      text-neutral-500
      text-center
      mt-4
      font-light
      '
      >
        <div className=' flex flex-row justify-center items-center gap-2'>
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
