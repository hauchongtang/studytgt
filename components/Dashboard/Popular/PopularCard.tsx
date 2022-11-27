import React from 'react'
import DoughnutChart from '../../util/charts/Doughnut'

function PopularCard() {

  const chartData = {
    labels: ['United States', 'Italy', 'Other'],
    datasets: [
      {
        label: 'Top Countries',
        data: [
          35, 30, 35,
        ],
        backgroundColor: [
          'rgba(75, 123, 229, 1)',
          'rgba(168, 92, 249, 1)',
          'rgba(85, 52, 165, 1)',
        ],
        hoverBackgroundColor: [
          'rgba(75, 123, 229, 1)',
          'rgba(168, 92, 249, 1)',
          'rgba(85, 52, 165, 1)',
        ],
        hoverBorderColor: 'white'
      },
    ],
  };

  return (
    <>
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">
          Top Modules
        </h2>
      </header>
      <div className="flex justify-center my-2">
        <div>
          <DoughnutChart chartData={chartData} height="300" width="300" />
        </div>
      </div>
    </>
  )
}

export default PopularCard