import React from 'react'
import Banner from '../../components/Dashboard/Banner'
import TopUsers from '../../components/Dashboard/Leaderboard/TopUsers'
import PopularCard from '../../components/Dashboard/Popular/PopularCard'
import MyTasks from '../../components/Dashboard/Tasks/PersonalTasks/MyTasks'
import RecentActivity from '../../components/Dashboard/Tasks/RecentActivity'
import Layout from '../../components/Layout'

function DashboardView() {
  return (
    <Layout>
      <div className="absolute top-16 right-0 w-full lg:left-60 lg:top-16 lg:w-[calc(100vw_-_20rem)]">
        <div className="grid lg:grid-cols-3 lg:gap-3 lg:p-4 lg:w-[calc(100vw_-_16.05rem)]">
          <div className="relative h-48 bg-[#A85CF9] col-span-3 rounded-lg">
            <Banner />
          </div>
          <div className="relative h-96 col-span-3 lg:col-span-2 bg-white shadow-lg border border-slate-200 rounded-lg">
            <TopUsers />
          </div>
          <div className="relative h-96 col-span-3 lg:col-span-1 bg-white shadow-lg border border-slate-200 rounded-lg">
            <PopularCard />
          </div>
          <div className="relative h-96 col-span-3 lg:col-span-1 bg-white shadow-lg border border-slate-200 rounded-lg overflow-auto">
            <RecentActivity />
          </div>
          <div className="relative h-96 col-span-3 lg:col-span-2 bg-white shadow-lg border border-slate-200 rounded-lg">
            <MyTasks />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardView