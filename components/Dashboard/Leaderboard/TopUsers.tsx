import React from 'react'
import TopUserTable from './Tables/TopUserTable'

function TopUsers() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white rounded-lg">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Leaderboard</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <TopUserTable />
        </div>
      </div>
    </div>
  )
}

export default TopUsers