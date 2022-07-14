import {  signIn } from 'next-auth/react'
import Image from 'next/image'
const SignIn = () => {

    return (
      <div className='grid place-items-center'>
        <Image
          src='https://links.papareact.com/t4i'
          width={400}
          height={400}
          objectFit='contain'
          alt='logo'
        />
         <h1  onClick={() => signIn()}   className = 'p-5 bg-blue-500 rounded-full text-center text-white cursor-pointer'>please login with facebook</h1>

      </div>
    )
  }


export default SignIn
