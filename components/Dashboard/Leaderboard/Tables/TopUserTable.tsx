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
          data?.slice(0, 5).map((item: leaderboardData, idx) => {
            let hours = determineHours(item.points);
            return (
              <tr key={idx}>
                <td className="p-2">
                  <div className="flex items-center">
                    <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                      <circle fill="#24292E" cx="18" cy="18" r="18" />
                      <path d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" fill="#FFF" />
                    </svg>
                    <div className="text-slate-800">{item.name ? item.name : "User"}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{item.points}</div>
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
                  <div className="text-center">{hours}</div>
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