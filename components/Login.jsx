import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
const Login = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className='flex'>
        <Image
          src='https://links.papareact.com/t4i'
          width={400}
          height={400}
          objectFit='contain'
          alt='logo'
        />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}> Sign out </button>{' '}
      </div>
    )
  }
  return (
    <div className='flex'>
      <Image
        src='https://links.papareact.com/t4i'
        width={400}
        height={400}
        objectFit='contain'
        alt='logo'
      />
      Not signed in <br />
      <button onClick={() => signIn()}> Sign in </button>{' '}
    </div>
  )
}

export default Login
