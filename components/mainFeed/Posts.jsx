import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from '@heroicons/react/outline'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { Post } from './Post'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { data: session } = useSession()
  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(
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
  }, [db])

  console.log(posts)
  return (
    <div>
      {' '}
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          image={post.image}
          userimg={post.profileImg}
          caption={post.caption}
          username={post.username}
        />
      ))}{' '}
    </div>
  )
}

export default Posts
