import React from 'react'

function TaskCard() {
  return (
    <li className="flex px-2 my-2 rounded-lg bg-purple-100 h-20">
      <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
        <div className="grow flex justify-between">
          <div className="self-center">
            CS2030 Assignment 1
          </div>
          <div className="shrink-0 self-end ml-2">
            <div className="font-medium text-indigo-500 hover:text-indigo-600">30 min</div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TaskCard