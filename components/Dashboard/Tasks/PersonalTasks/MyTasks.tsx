import React from 'react'
import TaskCard from './TaskCard'

function MyTasks() {
  return (
    <div className="col-span-full xl:col-span-6 bg-whiterounded-sm">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Pending Tasks</h2>
      </header>
      <div className="px-4">
        <ul>
          <TaskCard />
          <TaskCard />
        </ul>
      </div>
    </div>
  )
}

export default MyTasks