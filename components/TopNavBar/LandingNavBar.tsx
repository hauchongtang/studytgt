import React from 'react'

function LandingNavBar() {
  return (
    <nav className="fixed z-10 inset-x-0 top-0 h-16 bg-transparent w-full">
      <div className="flex justify-left">
        <h1 className="text-2xl py-2 mx-4 lg:p-4 lg:mx-8 cursor-pointer font-bold text-red-400 pb-4 w-full">
          splat
        </h1>
      </div>
    </nav>
  )
}

export default LandingNavBar