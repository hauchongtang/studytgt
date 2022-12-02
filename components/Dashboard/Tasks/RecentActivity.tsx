import React from 'react'
import GridCardHeader from '../../Common/GridCardHeader';
import { generateTasks, Task } from '../../util/misc/tasklist';
import ActivityCard from './ActivityCard'

interface IRecentActivityProps {
  data: []
}

function RecentActivity(props: IRecentActivityProps) {
  const { data } = props;
  const {
    visibleDayTasks,
    visibleWeekTasks,
    visibleMonthTasks,
    visibleYearTasks,
  } = generateTasks(data);

  const determineFirstSection = () => {
    let result: Task[] = [];

    if (visibleDayTasks.length > 0) {
      result = visibleDayTasks;
      return { result, text: "Less than a week ago" };
    } else if (visibleWeekTasks.length > 0) {
      result = visibleWeekTasks;
      return { result, text: "Less than a month ago" };
    } else if (visibleMonthTasks.length > 0) {
      result = visibleMonthTasks;
      return { result, text: "Less than a year ago" };
    } else {
      result = visibleYearTasks
      return { result, text: "More than a year ago" };
    }
  }

  const firstSection = determineFirstSection();
  
  return (
    <div className="col-span-full xl:col-span-6 bg-whiterounded-sm">
      <GridCardHeader text='Recent Activity' />
      <div className="px-4">
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">
            X Moments ago
          </header>
          <ul className="py-4">
            {
              firstSection?.result.slice(0, 10).map((item: Task, _) => {
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