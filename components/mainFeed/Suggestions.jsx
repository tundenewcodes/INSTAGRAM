import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    let newSuggestions = Array(5)
      .join()
      .split(',')
      .map(
        function () {
          return {
            username: faker.name.findName(),
            avatar: faker.image.avatar(),
            company: faker.company.companyName()
          }
        },
        { i: 1 }
      )

    setSuggestions(newSuggestions)
  }, [])

  return (
    <div className='mt-4 ml-10'>
      <div className='jusify-between flex text-sm mb-5'>
        <h3 className='text-sm font-bold text-gray-400'>
          suggestions for you
        </h3>
        <button className='text-gray-600 font-semibold'>
          see all
        </button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.name}
          className='flex items-center justify-between mt-3'>
          <img
            src={profile.avatar}
            className='w-10 h-10 border p-[2px] rounded-full'
          />
          <div className='flex-1 ml-4'>
            <h2 className='font-semibold text-sm'>
              {profile.username}
            </h2>
            <h3 className='text-xs text-gray-400 truncate'>
              works at {profile.company}
            </h3>
          </div>
          <button className='text-blue-400 font-bold text-xs'>
            follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
