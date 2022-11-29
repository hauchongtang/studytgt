import React, { useState } from 'react'
import { generateHiddenTasks, generateVisibleTasks, Task } from '../../../util/misc/tasklist';

import TaskCard from './TaskCard'
import TaskListItem from './TaskListTabHeader';

interface IPersonalTasksProps {
  data: []
}

function MyTasks(props: IPersonalTasksProps) {
  const [activeStatus, setActiveStatus] = useState(1);
  const { data } = props;
  const hiddenTasks: Task[] = generateHiddenTasks(data);
  const visibleTasks: Task[] = generateVisibleTasks(data);

  return (
    <div className="col-span-full xl:col-span-6 bg-whiterounded-sm">
      <h2 className="flex py-4 px-4 border-b border-slate-100 font-semibold text-slate-800">Tasks</h2>
      <header className="flex py-2 px-4 border-b border-slate-100">
        <ul className="flex items-center h-full">
          <li onClick={() => setActiveStatus(1)}
            className={activeStatus == 1
              ? "flex border-b-4 border-violet-600 text-md text-gray-600 cursor-pointer mr-2 px-1"
              : "flex border-b-4 text-md border-white hover:border-violet-600 text-gray-600 cursor-pointer mr-2 px-1"}>
            <TaskListItem count={hiddenTasks.length} pending />
          </li>
          <li onClick={() => setActiveStatus(2)}
            className={activeStatus == 2
              ? "flex border-b-4 border-violet-600 text-md text-gray-600 cursor-pointer mr-2 px-1"
              : "flex border-b-4 text-md border-white hover:border-violet-600 text-gray-600 cursor-pointer mr-2 px-1"}>
            <TaskListItem count={visibleTasks.length} pending={false} />
          </li>
        </ul>
      </header>
      <div className="px-4">
        <ul>
          {
            activeStatus === 1 ? hiddenTasks?.map((item, idx) => {
              return (
                <TaskCard key={idx} data={item} isDone={false} />
              )
            }) : visibleTasks?.slice(0, 10).map((item, idx) => {
              return (
                <TaskCard key={idx} data={item} isDone />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default MyTasks