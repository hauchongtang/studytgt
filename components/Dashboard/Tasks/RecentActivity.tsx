import React from 'react'
import ActivityCard from './ActivityCard'

function RecentActivity() {
  return (
    <div className="col-span-full xl:col-span-6 bg-whiterounded-sm">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent Activity</h2>
      </header>
      <div className="px-4">
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
            This Week
          </header>
          <ul className="py-4">
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
          </ul>
      </div>
      <div className="px-4">
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
            More than a week ago
          </header>
          <ul className="py-4">
            <ActivityCard />
            <ActivityCard />
          </ul>
      </div>
    </div>
  )
}

export default RecentActivity