import React from 'react'
import { determineBadgeFirstHour, determineBadgeFirstTask, determineBadgeOneDay, determineBadgeOneMonth, determineBadgeOneWeek, determineBadgeOneYear, determineHours, leaderboardData } from '../../../util/misc/leaderboard';

interface ITopUserTableProps {
  data: leaderboardData[]
}

function TopUserTable(props: ITopUserTableProps) {
  const { data } = props;
  // console.log(data)
  return (
    <table className="table-auto w-full">
      <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
        <tr>
          <th className="p-2">
            <div className="font-semibold text-left">Name</div>
          </th>
          <th className="p-2">
            <div className="font-semibold text-center">Points</div>
          </th>
          <th className="p-2">
            <div className="font-semibold text-center">Badges</div>
          </th>
          <th className="p-2">
            <div className="font-semibold text-center">Total Time</div>
          </th>
        </tr>
      </thead>
      <tbody className="text-sm font-medium divide-y divide-slate-100">
        {
          data?.slice(0, 10).map((item: leaderboardData, idx) => {
            let hours = determineHours(item.points);
            return (
              <tr key={idx}>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-slate-800">{item.name ? item.name : "User"}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-violet-400">{item.points}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">
                    {determineBadgeFirstTask(hours) && <> 1️⃣</>}
                    {determineBadgeFirstHour(hours) && <>⭐</>}
                    {determineBadgeOneDay(hours) && <>⭐</>}
                    {determineBadgeOneWeek(hours) && <>⭐</>}
                    {determineBadgeOneMonth(hours) && <>⭐</>}
                    {determineBadgeOneYear(hours) && <>❣️</>}
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center text-teal-600">{hours}</div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default TopUserTable