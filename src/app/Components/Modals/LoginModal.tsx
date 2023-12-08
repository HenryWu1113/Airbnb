'use client'

import { signIn } from 'next-auth/react'
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
import { useRouter } from 'next/navigation'

const LoginModal = () => {
  const router = useRouter()
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
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    console.log(data)

    // 引入 next-auth 的 signIn，把登入要的信箱密碼存入做驗證
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)

      // {error: null, status: 200, ok: true, url: 'http://localhost:3000/'}
      // 登入成功
      if (callback?.ok) {
        toast.success('Logged in ')
        router.refresh()
        loginModal.onClose()
      }

      // {error: 'Invalid credentials', status: 401, ok: false, url: null}
      // 登入失敗
      if (callback?.error) {
        console.log(callback)
        toast.error(callback.error)
      }
    })
  }

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input
        id='email'
        label='Email'
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
        onClick={() => {}}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {}}
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
            onClick={registerModal.onClose}
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
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
