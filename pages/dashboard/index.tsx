import { getSession } from 'next-auth/react'
import React from 'react'
import Banner from '../../components/Dashboard/Banner'
import TopUsers from '../../components/Dashboard/Leaderboard/TopUsers'
import PopularCard from '../../components/Dashboard/Popular/PopularCard'
import Layout from '../../components/Layout'
import MiniTimeTable from '../../components/Dashboard/Timetable/MiniTimeTable'
import TaskGroup from '../../components/Dashboard/Tasks/TaskGroup'
import { getTasks, getTasksByUserId } from '../../src/api/tasks'
import { getAllUsers } from '../../src/api/users'
import { GetServerSideProps } from 'next/types'
import { parseUrl } from '../../src/api/timetable'

interface IDashboardProps {
  users: [],
  tasks: [],
  userTasks: [],
  timetable: any
}

function DashboardView(props: IDashboardProps) {
  const { users, tasks, userTasks, timetable } = props;

  return (
    <Layout>
      <div className="absolute top-16 right-0 w-full lg:left-60 lg:top-16 lg:w-[calc(100vw_-_20rem)]">
        <div className="grid p-4 md:p-8 gap-4 lg:grid-cols-12 lg:gap-3 lg:p-4 lg:w-[calc(100vw_-_16.05rem)]">
          <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg col-span-12 rounded-lg">
            <Banner />
          </div>
          <div className="relative h-96 col-span-12 lg:col-span-7 bg-white shadow-lg border border-slate-200 rounded-lg overflow-auto">
            <TopUsers data={users}/>
          </div>
          <div className="relative h-96 col-span-12 lg:col-span-5 bg-white shadow-lg border border-slate-200 rounded-lg">
            <PopularCard />
          </div>
          <div className="relative h-[24rem] bg-white shadow-lg lg:col-span-6 col-span-12 rounded-lg">
            <MiniTimeTable timetable={timetable}/>
          </div>
          <TaskGroup data={userTasks} allTasks={tasks} />
        </div>
      </div>
    </Layout>
  )
}

// Called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;
  // This value is considered fresh for ten seconds (s-maxage=10).
  // If a request is repeated within the next 10 seconds, the previously
  // cached value will still be fresh. If the request is repeated before 30 seconds,
  // the cached value will be stale but still render (stale-while-revalidate=30).
  //
  // In the background, a revalidation request will be made to populate the cache
  // with a fresh value. If you refresh the page, you will see the new value.
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=30'
  )

  const session: any = await getSession(context);
  let users = await getAllUsers(session.refreshToken);
  let tasks = await getTasks(session.refreshToken);
  let userTasks = await getTasksByUserId(session.refreshToken, session.user.userId);
  let currentUserTimetable = session.user.timetable ? session.user.timetable : null;
  let parsedTimetable = await parseUrl(currentUserTimetable);
  if (users.error) users = null;
  if (!tasks) tasks = [];
  if (!userTasks) userTasks = null;

  return { props: {
    users,
    tasks,
    userTasks,
    timetable: {
      url: currentUserTimetable,
      moduleData: parsedTimetable
    },
  } }
}

export default DashboardView