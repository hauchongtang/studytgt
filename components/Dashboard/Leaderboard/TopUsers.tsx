import React from 'react'
import { generateLeaderboard } from '../../util/misc/leaderboard';
import TopUserTable from './Tables/TopUserTable'

interface ILeaderboardProps {
  data: []
}

function TopUsers(props: ILeaderboardProps) {
  const { data } = props;
  const leaderboard = generateLeaderboard(data);

  return (
    <div className="col-span-full xl:col-span-8 bg-white rounded-lg">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Leaderboard</h2>
      </header>
      <div className="p-4">
        <div className="overflow-x-auto">
          <TopUserTable data={leaderboard}/>
        </div>
      </div>
    </div>
  )
}

export default TopUsers