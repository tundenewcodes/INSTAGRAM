import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker'
import StoryCard from './StoryCard'
import { signIn, signOut, useSession } from 'next-auth/react'

const Stories = () => {
  const [suggestions, setSuggestions] = useState([])
  const { data: session } = useSession()
  useEffect(() => {
    let newSuggestions = Array(20)
      .join()
      .split(',')
      .map(
        function () {
          return {
            username: faker.name.findName(),
            avatar: faker.image.avatar(),
          }
        },
        { i: 1 }
      )

    setSuggestions(newSuggestions)
  }, [])

  return (
    <div className='flex p-6  space-x-2 overflow-x-scroll mt-8 bg-white border border-gray-200 rounded-sm  scrollbar-thin scrollbar-thumb-black'>
      {session && (
        <StoryCard
          username={session?.user?.username}
          avatar={session?.user?.image}
        />
      )}
      {suggestions.map((profile) => (
        <StoryCard
          key={profile.username}
          username={profile.username}
          avatar={profile.avatar}
        />
      ))}
    </div>
  )
}

export default Stories
