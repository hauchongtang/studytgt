import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js"
import React from 'react'

Chart.register(ArcElement, Tooltip, Legend);

interface IDoughnutProps {
  chartData: any,
  width: string | number,
  height: string | number
}

function DoughnutChart(props: IDoughnutProps) {
  const { chartData, width, height } = props;
  return (
    <Doughnut data={chartData} width={width} height={height} />
  )
}

export default DoughnutChart