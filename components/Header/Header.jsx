import React from 'react'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'
import {
  SearchIcon,
  PlusCircleIcon,
  ChevronDownIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../../atoms/modalAtom'
const Header = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const router = useRouter()
  console.log(session)
  return (
    <header className='shadow-sm sticky top-0 z-50 border-b bg-white '>
      <div className='flex justify-between max-w-6xl  mx-4  lg:mx-auto'>
        <div className='relative cursor-pointer hidden lg:inline-grid w-24 h-24'>
          <Image
            src='https://links.papareact.com/ocw'
            alt='instagram'
            layout='fill'
            objectFit='contain'
            onClick={() => router.push('/')}
          />{' '}
        </div>{' '}
        <div className='relative cursor-pointer  lg:hidden  flex-shrink-0 w-10 h-10'>
          <Image
            src='https://links.papareact.com/jjm'
            alt='instagram'
            layout='fill'
            objectFit='contain'
            onClick={() => router.push('/')}
          />{' '}
        </div>{' '}
        <div className='max-w-xs'>
          <div className='relative mt-1 p-3 rounded-md'>
            <div className='absolute pl-3  flex items-center  inset-y-0 pointer-events-none '>
              <SearchIcon className='h-5 w-5  text-gray-500' />
            </div>{' '}
            <input
              type='text'
              placeholder='search'
              className='pl-10 bg-gray-50 block w-full sm:text-sm border-gray focus:ring-black focus:border-black rounded-md border-gray-300 '
            />
          </div>{' '}
        </div>{' '}
        <div className='flex  space-x-4 items-center justify-end'>
          <HomeIcon
            onClick={() => router.push('/')}
            className='hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out'
          />
          <MenuIcon className='h-6 md:hidden  cursor-pointer' />{' '}
          {session ? (
            <>
              <div className='relative  hidden  h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out'>
                <PaperAirplaneIcon className='hidden rotate-45 h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out' />
                <div className='absolute -top-1 -right-2 w-5 text-xs h-5 bg-red-500 rounded-full flex justify-center items-center animate-pulse text-white'>
                  3{' '}
                </div>{' '}
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className='hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out'
              />
              <UserGroupIcon className='hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out' />
              <HeartIcon className='hidden h-6 md:inline-flex cursor-pointer hover:scale-125 transition-all duration-150 ease-out' />
              <img
                className='h-10 rounded-full cursor-pointer'
                src={session.user.image}
                alt='profile pic'
                onClick={signOut}
              />{' '}
            </>
          ) : (
            <button onClick={signIn}> sign in </button>
          )}{' '}
        </div>{' '}
      </div>{' '}
    </header>
  )
}

export default Header
