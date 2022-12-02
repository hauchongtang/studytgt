import { isLessThanWeekAgo, isLessThanMonthAgo, isLessThanYearAgo } from "../date/dateUtil";

/**
 * Default data type for a Task
 */
export type Task = { 
  task_id: string,
  duration: string
  name: string, 
  hidden: boolean,
  moduleCode: string,
  taskName: string,
  created_at: string,
  updated_at: string,
  user_id: string,
}

/**
 * Generates a list of hidden `Task` objects.
 */
export const generateHiddenTasks = (data: any[]) => {
  let hiddenTasks: Task[] = [];

  for (let item of data) {
    if (item.hidden) {
      hiddenTasks.push(item);
    }
  }
  return hiddenTasks;
}

/**
 * Generates a list of visible `Task` objects.
 */
 export const generateVisibleTasks = (data: any[]) => {
  let visibleTasks: Task[] = [];

  for (let item of data) {
    if (!item.hidden) {
      visibleTasks.push(item);
    }
  }
  return visibleTasks;
}


/** 
 * Generates a list of visible and hidden `Task` objects.
 * Visisble tasks are tasks that are done/ completed.
 * Hidden tasks are tasks that are not done.
 * @returns object `{ visibleTasks, hiddenTasks }`
 * */ 
export const generateTasks = (data: any[]) => {
  let visibleDayTasks: Task[] = [];
  let visibleWeekTasks: Task[] = [];
  let visibleMonthTasks: Task[] = [];
  let visibleYearTasks: Task[] = [];
  let hiddenDayTasks: Task[] = [];
  let hiddenWeekTasks: Task[] = [];
  let hiddenMonthTasks: Task[] = [];
  let hiddenYearTasks: Task[] = [];

  for (let item of data) {
    let singleTask = {
      name: item.first_name,
      task_id: item.ID,
      taskName: item.taskName,
      duration: item.duration,
      hidden: item.hidden,
      moduleCode: item.moduleCode,
      created_at: item.created_at,
      updated_at: item.updated_at,
      user_id: item.user_id
    };

    if (item.hidden) {
      if (isLessThanWeekAgo(singleTask.updated_at)) {
        hiddenDayTasks.push(singleTask);
        continue;
      } else if (isLessThanMonthAgo(singleTask.updated_at)) {
        hiddenWeekTasks.push(singleTask);
        continue;
      } else if (isLessThanYearAgo(singleTask.updated_at)) {
        hiddenMonthTasks.push(singleTask);
        continue;
      } else {
        hiddenYearTasks.push(singleTask);
      }
    } else {
      if (isLessThanWeekAgo(singleTask.updated_at)) {
        visibleMonthTasks.push(singleTask);
        continue;
      }
      if (isLessThanMonthAgo(singleTask.updated_at)) {
        visibleWeekTasks.push(singleTask);
        continue;
      }
      if (isLessThanYearAgo(singleTask.updated_at)) {
        visibleDayTasks.push(singleTask);
        continue;
      }
       else {
        visibleYearTasks.push(singleTask);
      }
    }
  }

  return {
    visibleDayTasks,
    visibleWeekTasks,
    visibleMonthTasks,
    visibleYearTasks,
    hiddenDayTasks,
    hiddenWeekTasks,
    hiddenMonthTasks,
    hiddenYearTasks,
  };
}
