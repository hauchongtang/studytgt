import React, { useState } from 'react'
import TaskStartModal from '../../../Common/TaskStartModal';
import { generateDateString } from '../../../util/date/dateUtil';

import { Task } from '../../../util/misc/tasklist'

interface ITaskCardProps {
  data: Task,
  isDone: boolean
}

function TaskCard(props: ITaskCardProps) {
  const { data, isDone } = props;
  
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <li className="flex flex-col justify-between dark:bg-purple-200 bg-white dark:border-gray-100 rounded-lg border border-gray-400 mb-6 py-6 px-6 h-36">
      <div>
        <h4 className="text-gray-800 font-bold mb-3">{data?.taskName}</h4>
        <p className="text-gray-800 text-sm font-medium italic">for {data?.duration} min</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <p className="text-sm font-semibold">Created: {generateDateString(data?.updated_at)}</p>
          <TaskStartModal isOpen={isOpen} closeModal={closeModal} taskData={data} />
          {!isDone 
            ? <button 
                onClick={openModal}
                className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center"
              >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
              </svg>
            </button> 
            : null}
        </div>
      </div>
    </li>
  )
}

export default TaskCard