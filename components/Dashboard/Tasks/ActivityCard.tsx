import React from 'react'

function ActivityCard() {
  return (
    <li className="flex px-2">
      <div className="w-9 h-9 rounded-full shrink-0 bg-[#6FDFDF] my-2 mr-3">
        <svg className="w-9 h-9 fill-current text-black" viewBox="0 0 36 36">
          <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
        </svg>
      </div>
      <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
        <div className="grow flex justify-between">
          <div className="self-center">
            <a className="font-medium text-slate-800 hover:text-slate-900">
              Nick Mark
            </a> done <a className="font-bold text-slate-800">
              CS3230
            </a> Project
          </div>
          <div className="shrink-0 self-end ml-2">
            <div className="font-medium text-indigo-500 hover:text-indigo-600">30 min</div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ActivityCard