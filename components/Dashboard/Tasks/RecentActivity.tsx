import React from 'react'
import GridCardHeader from '../../Common/GridCardHeader';
import { generateTasks, Task } from '../../util/misc/tasklist';
import ActivityCard from './ActivityCard'

interface IRecentActivityProps {
  data: Task[]
}

function RecentActivity(props: IRecentActivityProps) {
  const { data } = props;
  const {
    visibleTasks, 
    hiddenTasks
  } = generateTasks(data);
  
  return (
    <div className="col-span-full xl:col-span-6 bg-whiterounded-sm">
      <GridCardHeader text='Recent Activity' />
      <div className="px-4">
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
            X Moments ago
          </header>
          <ul className="py-4">
            {
              visibleTasks?.map((item: Task, _) => {
                return (
                  <ActivityCard key={item.task_id} data={item} />
                )
              })
            }
          </ul>
      </div>
    </div>
  )
}

export default RecentActivity