import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import React from 'react'
import Banner from '../../components/Dashboard/Banner'
import TopUsers from '../../components/Dashboard/Leaderboard/TopUsers'
import PopularCard from '../../components/Dashboard/Popular/PopularCard'
import MyTasks from '../../components/Dashboard/Tasks/PersonalTasks/MyTasks'
import RecentActivity from '../../components/Dashboard/Tasks/RecentActivity'
import Layout from '../../components/Layout'
import { getTasks, getTasksByUserId } from '../../src/api/tasks'
import { getAllUsers } from '../../src/api/users'

interface IDashboardProps {
  users: [],
  tasks: [],
  userTasks: []
}

function DashboardView(props: IDashboardProps) {
  const { users, tasks, userTasks } = props;

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
          <div className="relative h-[39rem] col-span-12 lg:col-span-5 bg-white shadow-lg border border-slate-200 rounded-lg overflow-auto">
            <RecentActivity data={tasks}/>
          </div>
          <div className="relative h-[39rem] col-span-12 lg:col-span-7 bg-white shadow-lg border border-slate-200 rounded-lg overflow-auto">
            <MyTasks data={userTasks}/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Called on every request
export async function getServerSideProps(context: GetSessionParams) {
  const session: any = await getSession(context);
  const users = await getAllUsers(session.refreshToken);
  const tasks = await getTasks(session.refreshToken);
  const userTasks = await getTasksByUserId(session.refreshToken, session.user.userId);

  return { props: {
    users,
    tasks,
    userTasks,
  } }
}

export default DashboardView