import { useSession } from 'next-auth/react';
import React from 'react'
import { currentDateString, dayOfWeekString } from '../util/date/dateUtil'

function Banner() {
  const { data: session } = useSession();
  const username = session?.user?.name?.length === 0 ? "User" : session?.user?.name;
  return (
    <>
      <div className="lg:flex justify-between p-8">
        <div>
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">Hello, {username} 👋</h1>
          <p className="invisible lg:visible text-white">Here is what’s happening today:</p>
        </div>
        <div>
          <h1 className="text-2xl invisible lg:visible md:text-3xl font-bold mb-1 text-white">
            {currentDateString},
          </h1>
          <h1 className="text-2xl invisible lg:visible md:text-3xl font-bold mb-1 text-white">
            {dayOfWeekString}
          </h1>
        </div>
      </div>
    </>
  )
}

export default Banner