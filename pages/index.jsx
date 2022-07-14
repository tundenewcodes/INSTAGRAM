import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header/Header'
import Feeds from '../components/mainFeed/Feeds'
import Modal from '../components/Modal'

export default function Home() {
  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title> INSTAGRAM CLONE APP </title>{' '}
        <meta
          name='cloning instagram with nextjs'
          content='Generated by create next app'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>{' '}
      <Header />
      <Feeds />
      <Modal/>
    </div>
  )
}