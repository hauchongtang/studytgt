import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title } from 'chart.js';
import { Doughnut, Line } from "react-chartjs-2";

import styles from './Widget.module.css'
import { Container, Row, Col, Progress } from "reactstrap";
import e from "cors";
import { determineLevel } from "../hooks/determineLevel";

function Widget({ id, backgroundColor, popularModules, personalTasks }) {
  ChartJS.register(ArcElement, Tooltip, Legend, Title, LineElement, PointElement, LinearScale, CategoryScale);
  const { level, nextLevel, targetPointsToNextLevel, points } = determineLevel(localStorage.getItem("points"));
  const trendDataSelf = {
    labels: getHalfYearlyData(personalTasks).map(item => toMonthName(item.month)),
    datasets: [
      {
        label: 'Completed',
        data: getHalfYearlyData(personalTasks).map(item => {
          return {
            x: item.month,
            y: item.count
          }
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 0.6)'
      },
      {
        label: 'Not Done',
        data: getYearlyImcompleteData(personalTasks).map(item => {
          return {
            x: item.month,
            y: item.count
          }
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  }
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
      <Container>
        <Row>
          <Col xs={4}>
            <div
              style={{
                height: '275px',
                width: 'auto',
              }}
            >
              <h5 style={{ textAlign: 'center' }}>Your Task Distribution</h5>
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
          </Col>
          <Col xs={8}>
            <h5 style={{ textAlign: 'center' }}>Your Completed Activity Trend</h5>
            <div style={{ height: '1vh' }} />
            <Line
              data={trendDataSelf}
              options={
                {
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                    },
                }
              }
              }
            />
          </Col>
        </Row>
        <Row
          style={{  }}
        >
          <div style={{ height: '17.5vh' }} />
          <h2 style={{ textAlign: 'start' }}>{`Level ${level} (${Math.round((points/targetPointsToNextLevel)*100)}%)`}</h2>
          <Progress value={((points)/(targetPointsToNextLevel))*100} style={{ width: '25vw', padding: '0px', marginLeft: '0.5vw' }} color='warning'/>
        </Row>
      </Container>
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
  array.sort((a, b) => b.count - a.count)

  return array
}

export const getHalfYearlyData = (target) => {
  const monthMap = new Map();
  for (var i = 0; i < 12; i++) {
    monthMap.set(i, 0);
  }
  target.forEach(item => {
    const date = new Date(item.updated_at);
    if (monthMap.get(date.getMonth()) === undefined) {
      if (!item.hidden) monthMap.set(date.getMonth(), 1);
    } else {
      if (!item.hidden) monthMap.set(date.getMonth(), monthMap.get(date.getMonth()) + 1);
    }
  })
  var array = []
  array = Array.from(monthMap, ([month, count]) => ({ month, count }))
  array.sort((a, b) => a.month - b.month)
  return array;
}

export const getYearlyImcompleteData = (target) => {
  const monthMap = new Map();
  for (var i = 0; i < 12; i++) {
    monthMap.set(i, 0);
  }
  target.forEach(item => {
    const date = new Date(item.updated_at);
    if (monthMap.get(date.getMonth()) === undefined) {
      if (item.hidden) monthMap.set(date.getMonth(), 1);
    } else {
      if (item.hidden) monthMap.set(date.getMonth(), monthMap.get(date.getMonth()) + 1);
    }
  })
  var array = []
  array = Array.from(monthMap, ([month, count]) => ({ month, count }))
  array.sort((a, b) => a.month - b.month)
  return array;
}

export const toMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}