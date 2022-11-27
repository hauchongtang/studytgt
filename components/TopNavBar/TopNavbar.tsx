import React from 'react'
import { useSession } from 'next-auth/react'

function TopNavbar() {
  const { data: session } = useSession();
  const username = session?.user?.name?.length === 0 ? "User" : session?.user?.name;

  return (
    <nav className="fixed z-10 inset-x-0 top-0 h-16 bg-white w-full">
        <div className="flex justify-end">
          <button 
            type="button" 
            className="relative top-2 lg:mx-4 mx-16 p-2 flex rounded-full bg-[#5534A5] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" 
            aria-expanded="false" 
            aria-haspopup="true"
          >
            <h4 className="relative top-1 text-white mx-2 font-bold text-base">{username}</h4>
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </button>
        </div>
    </nav>
  )
}

export default TopNavbar