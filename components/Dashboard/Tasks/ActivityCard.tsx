import React from 'react'
import { generateTimeAgo } from '../../util/date/dateUtil';
import { Task } from '../../util/misc/tasklist'

interface IActivityProps {
  data: Task
}

function ActivityCard(props: IActivityProps) {
  const { data } = props;
  const { name, taskName, duration, moduleCode, updated_at, user_id } = data;
  const momentAgo = generateTimeAgo(updated_at);

  return (
    <li className="flex px-2">
      <div className="w-9 h-9 rounded-full shrink-0 bg-[#6FDFDF] my-2 mr-3">
        <svg className="w-9 h-9 fill-current text-black" viewBox="0 0 36 36">
          <path d="M18.3 11.3l-1.4 1.4 4.3 4.3H11v2h10.2l-4.3 4.3 1.4 1.4L25 18z" />
        </svg>
      </div>
      <div className="grow flex items-center border-b border-slate-100 text-xs py-2">
        <div className="grow flex justify-between">
          <div className="self-center">
            <a className="font-bold text-slate-800 hover:text-slate-900">
              {name?.length > 20 ? name.substring(20) + "..." : name}
            </a> done
            <p className="italic"> {taskName?.length > 20 ? taskName.substring(20) + "...\n" : taskName + "\n"} of <a className="font-bold text-slate-800"
            href={`https://nusmods.com/modules/${moduleCode}`}>
              {moduleCode}
            </a></p>
              <p className="font-bold">for {duration} min</p>
          </div>
          <div className="shrink-0 self-end ml-2">
            <div className="font-medium text-indigo-500 hover:text-indigo-600">{momentAgo}</div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default ActivityCard