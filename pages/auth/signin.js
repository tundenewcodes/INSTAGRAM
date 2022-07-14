import {getProviders, signIn} from 'next-auth/react'
import  Header  from  '../../components/Header/Header'
const signin = ({providers}) => {
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center jusiy-center  min-h-screen py-2 -mt-56 px-14 text-center '>
        <img
          src='https://links.papareact.com/ocw'
          alt=''
          className='w-80'
        />
        <p className='font-xs italic'>
          this is an instagram CLONE app i built for practicing on my
          skills
        </p>
        <div className='m-40'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className='rounded-lg text-white bg-blue-500 p-3'
                onClick={() =>
                  signIn(provider.id, { callbackUrl: '/' })
                }>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default signin