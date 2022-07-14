import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { db,storage } from '../../firebase'
import {v4} from 'uuid'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import {
  collection,
  addDoc,
  serverTimestamp,
  doc, setDoc,set,
  getFirestore,
} from 'firebase/firestore'

const InputBox = () => {
  const metadata = {
    contentType: 'image/jpeg',
  }
  const { data: session, status } = useSession()
  //const storage = getStorage()
  //const db = getFirestore()
  const [imageToPost, setImageToPost] = useState(null)
  const inputRef = useRef()
  const filePickerRef = useRef()
  const sendPost = async (e) => {
    e.preventDefault()
    if (!inputRef.current.value) return
    await addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,

      timestamp: serverTimestamp(),
    }).then((doc) => {
      if (imageToPost) {
        const storageRef = ref(storage, `posts/${doc.id}`)
        const imageRef = ref(storage, `posts/${imageToPost.name  +v4()}`)
         uploadBytes(storageRef, imageToPost)
        //  .then((snapshot)=>{getDownloadURL(snapshot.ref)})
        //  .then((url)=>{
        //   setDoc(storageRef, { postImage: url }, { merge: true })
        //  })
         .then(()=>alert('uploaded'))
           //.then(() => {
            // const postRef = doc(db, 'posts', doc.id)
            // setDoc(postRef, { postImage: url }, { merge: true })
            // //  db.collection('posts').doc(doc.id).set(
            // //    {
            // //      postImage: url,
            // //    },
            // //    { merge: true }
            // //  )
           // alert('success')
          // })
        // ref(storage, `posts/${doc.id}`).putString(
        //   imageToPost,
        //   'data_url'
        // )
         removeImageFromPost()
        // uploadTask.on(
        //   'state_changed',
        //   null,
        //   (error) => {
        //     console.log(error)
        //   },
        //   () => {
        //     storage
        //       .ref(`posts`)
        //       .child(doc.id)
        //       .getDownloadURL()
        //       .then((url) => {
        //         db.collection('posts').doc(doc.id).set(
        //           {
        //             postImage: url,
        //           },
        //           { merge: true }
        //         )
        //       })
        //  }
        // )
      }
    })
    inputRef.current.value = ''
  }

  // const addImageToPost = (e) => {
  //   const reader = new FileReader()

  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  //   reader.onload = (readerEvent) => {
  //     setImageToPost(readerEvent.target.result)
  //   }
  // }

  const removeImageFromPost = () => {
    setImageToPost(null)
  }
  return (
    <div className='bg-white p-2 rounded-2xl text-gray-500 font-medium shadow-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed'
          alt='profile pic'
          className='rounded-full'
        />
        <form className='flex flex-1'>
          <input
            className='rounded-full h-12 flex-grow focus:outline-none px-5 bg-gray-100'
            type='text'
            ref={inputRef}
            placeholder={`what's  on your mind ${session.user.name}?`}
          />{' '}
          <button hidden type='submit' onClick={sendPost}>
            submit{' '}
          </button>
          {imageToPost && (
            <div
              className='flex flex-col transition hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'
              onClick={removeImageFromPost}>
              <img
                src={imageToPost}
                alt='image'
                className='h-10 object-contain'
              />
              <p className='text-xs text-red-500 text-center'>
                remove
              </p>
            </div>
          )}
        </form>{' '}
      </div>{' '}
      <div className='flex  justify-evenly p-3 border-t'>
        <div className='flex items-centerspace-x-1 flex-grow justify-center p-2 hover:bg-gray-100 cursor-pointer rounded-xl'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm xl:text-base'>
            live video{' '}
          </p>{' '}
        </div>{' '}
        <div
          className='flex items-center space-x-1 flex-grow justify-center p-2 hover:bg-gray-100 cursor-pointer rounded-xl'
          onClick={() => filePickerRef.current.click()}>
          <CameraIcon className='h-7 text-green-400' />
          <p className='text-xs sm:text-sm xl:text-base'>
            photo/video{' '}
          </p>
          <input
            type='file'
            hidden
            onChange={(e)=>{setImageToPost(e.target.files[0])}}
           ref={filePickerRef}
          />
        </div>{' '}
        <div className='flex items-centerspace-x-1 flex-grow justify-center p-2 hover:bg-gray-100 cursor-pointer rounded-xl'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className='text-xs sm:text-sm xl:text-base'>
            feeling / activity{' '}
          </p>
        </div>{' '}
      </div>{' '}
    </div>
  )
}

export default InputBox
