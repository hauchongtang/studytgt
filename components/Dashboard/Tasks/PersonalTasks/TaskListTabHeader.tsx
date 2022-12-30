import React from 'react'

interface ITaskListItemProps {
  count: number,
  pending: boolean
}

function TaskListTabHeader(props: ITaskListItemProps) {
  const { count, pending } = props;

  return (
    <div className="flex py-1">
      <h2 className="font-semibold text-slate-800">{pending ? "Pending" : "Complete"}</h2>
      <div className="bg-red-600 ml-2 h-6 md:h-6 w-10 md:mb-0 rounded-full flex items-center justify-center">
        <span className="text-xs text-gray-800 dark:text-gray-100 font-normal">{count}</span>
      </div>
    </div>
  )
}

export default TaskListTabHeader