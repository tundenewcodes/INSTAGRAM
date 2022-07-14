import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from '@heroicons/react/outline'

import  {HeartIcon as  HeartIconFilled} from  '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import Moment from 'react-moment'
export const Post = ({ id, username, userimg, caption, image }) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
        )
      }
    )

    return unSubscribe
  }, [db, id])

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, 'posts', id, 'likes'),
      (snapshot) => {
        setLikes(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
        )
      }
    )

    return unSubscribe
  }, [db, id])

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session.user?.uid) !== -1
      ),

    [likes]
  )

  const likePosts = async () => {
     if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
     } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
     }

  }
  console.log(hasLiked)
  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'), {
      username: session.user.username,
      comment: commentToSend,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    })
  }
  console.log(comments)
  return (
    <div className='bg-white my-7 border rounded-sm'>
      <div className='flex items-center p-5'>
        <img
          src={userimg}
          alt=''
          className='rounded-full w-12 h-12 object-contain border p-1 mr-3'
        />
        <p className='flex-1 font-bold'> {username} </p>
        <DotsHorizontalIcon className='h-5' />
      </div>
      <img src={image} alt='' className='object-cover w-full' />
      {session && (
        <div className='flex jusify-between pt-4 px-4'>
          <div className='flex space-x-4'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePosts}
                className='h-7 hover-scale-125 cursor-pointer transition-all ease-out text-red-500 duration-150'
              />
            ) : (
              <HeartIcon
                onClick={likePosts}
                className='h-7 hover-scale-125 cursor-pointer transition-all ease-out duration-150'
              />
            )}

            <ChatIcon className='h-7 hover-scale-125 cursor-pointer transition-all ease-out duration-150' />
            <PaperAirplaneIcon className='h-7 hover-scale-125 cursor-pointer transition-all ease-out duration-150' />
          </div>
          <BookmarkIcon className='h-7 hover-scale-125 cursor-pointer transition-all ease-out duration-150' />
        </div>
      )}
      <p className='p-5 truncate'>
        {likes.length > 0 && ( <p className='font-bold mb-1'> {likes.length}  likes</p>)}
        <span className='font-bold mr-1'> {username} </span>
        {caption}
      </p>

      {/* comments */}

      {comments.length > 0 && (
        <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map((comment) => (
            <div
              className='flex items-center space-x-2 mb-3'
              key={comment.id}>
              <img
                src={comment.profileImg}
                alt=''
                className='h-7  rounded-full'
              />
              <p className='text-sm flex-1'>
                {' '}
                <span className='font-bold'>
                  {comment.username}
                </span>{' '}
                {comment.comment}
              </p>
              <Moment fromNow className='pr-5 text-xs'>
                {comment.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7 ' />
          <input
            type='text'
            value={comment}
            className='border-none flex-1 focus:ring-0 outline-none'
            placeholder='add a comment'
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type='submit'
            disabled={!comment.trim()}
            onClick={sendComment}
            className='font-semibold  text-blue-400'>
            post
          </button>
        </form>
      )}
    </div>
  )
}
