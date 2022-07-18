import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

import styles from './Widget.module.css'

function Widget({ id, backgroundColor, popularModules, personalTasks }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const doughnutData = {
    labels: popularModules.slice(0, 5).map(item => item.module_code),
    datasets: [
      {
        data: popularModules.slice(0, 5).map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutDataSelf = {
    labels: getPopularTasks(personalTasks).slice(0, 5).map(item => item.moduleCode),
    datasets: [
      {
        data: getPopularTasks(personalTasks).slice(0, 5).map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        width: 'auto', height: '100%', backgroundColor,

      }}
      className={styles.widget}
    >
      <h3 className={styles.h3}>Stats</h3>
      <hr />
      {/* {popularModules.length > 0 && <h5 className={styles.h5} style={{ whiteSpace: 'pre-line' }}>
          {`Most Popular Module: \n ${popularModules[0].module_code}`}
        </h5>} */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly'
        }}
      >
        <div
          style={{
            height: '275px',
            width: 'auto',
          }}
        >
          <h5 style={{ textAlign: 'center' }}>Most Popular Modules (Overall)</h5>
          <div style={{ height: '30px' }} />
          <Doughnut
            data={doughnutData}
            options={
              {
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true
                  },
                },
              }
            }
          />
        </div>
        <div
          style={{
            height: '275px',
            width: 'auto',
          }}
        >
          <h5 style={{ textAlign: 'center' }}>Your Popular Modules</h5>
          <div style={{ height: '30px' }} />
          <Doughnut
            data={doughnutDataSelf}
            options={
              {
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true
                  },
                },
              }
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Widget

export const getPopularTasks = (target) => {
  const moduleCountMap = new Map();
  target.forEach(item => {
    if (moduleCountMap.get(item.moduleCode) === undefined)
      moduleCountMap.set(item.moduleCode, 1)
    else {
      moduleCountMap.set(item.moduleCode, moduleCountMap.get(item.moduleCode) + 1)
    }
  })
  var array = []
  array = Array.from(moduleCountMap, ([moduleCode, count]) => ({ moduleCode, count }));
  array.sort((a,b) => b.count - a.count)

  return array
}