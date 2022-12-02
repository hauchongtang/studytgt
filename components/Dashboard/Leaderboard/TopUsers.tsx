import React from 'react'
import GridCardHeader from '../../Common/GridCardHeader';
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
      <GridCardHeader text='Leaderboard' />
      <div className="p-4">
        <div className="overflow-x-auto">
          <TopUserTable data={leaderboard}/>
        </div>
      </div>
    </div>
  )
}

export default TopUsers