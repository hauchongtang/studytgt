import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { addTask } from '../../../src/api/tasks';
import { Task } from '../../util/misc/tasklist';
import AddTask from './PersonalTasks/AddTask'
import MyTasks from './PersonalTasks/MyTasks';
import RecentActivity from './RecentActivity'

interface ITaskGroupProps {
  data: Task[],
  allTasks: Task[]
}

function TaskGroup(props: ITaskGroupProps) {
  const { data, allTasks } = props;
  const [tasks, setTasks] = useState(data)
  const { data: session }: any = useSession();
  
  const addNewTask = async (newTask: any) => {
    let toAppend: any = {
      taskName: newTask.name,
      moduleCode: newTask.moduleCode,
      duration: newTask.duration,
      hidden: true,
      first_name: session?.user?.name,
      last_name: "",
      created_at: new Date()
    }
    
    const result = await addTask(session.refreshToken, toAppend, session?.user?.userId);

    let taskObj = {
      task_id: result.InsertedID,
      duration: toAppend.duration,
      name: session?.user?.name,
      hidden: toAppend.hidden,
      moduleCode: toAppend.moduleCode,
      taskName: toAppend.taskName,
      created_at: toAppend.created_at,
      updated_at: toAppend.created_at,
      user_id: session?.user?.userId
    }

    setTasks(() => [taskObj, ...tasks])
  }

  return (
    <>
      <div className="relative h-80 hidden lg:block lg:col-span-6 bg-white shadow-lg rounded-lg">
        <AddTask addNewTask={addNewTask}/>
      </div>
      <div className="relative h-[39rem] col-span-12 lg:col-span-6 bg-white shadow-lg border border-slate-200 rounded-lg overflow-auto">
        <RecentActivity data={allTasks} />
      </div>
      <div className="relative h-[39rem] col-span-12 lg:col-span-6 bg-white shadow-lg border border-slate-200 rounded-lg overflow-auto">
        <MyTasks data={tasks} key={tasks.length}/>
      </div>
    </>
  )
}

export default TaskGroup