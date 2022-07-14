import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Miniprofile = ({src}) => {
   const { data: session } = useSession()
   console.log(session)
  return (
    <div className='flex items-center justify-between ml-10 mt-14'>
      <img
        className='w-16 h-16 rounded-full border p-[2px]'
        src={session?.user?.image}
        alt=''
      />
      <div className='flex-1 mx-4'>
        <h2 className='font-bold '>{session?.user?.username}</h2>
        <h3 className='text-sm text-gray-400'>welcome to insta</h3>
      </div>
      <button className='text-sm text-blue-400 font-semibold'  onClick={signOut}>signout</button>
    </div>
  )
}

export default Miniprofile