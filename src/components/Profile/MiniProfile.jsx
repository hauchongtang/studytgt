import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from 'reactstrap';

import { determineLevel } from "../hooks/determineLevel";

const MiniProfile = ({ data }) => {
  const { level, nextLevel, targetPointsToNextLevel, points } = determineLevel(data.points);
  return (
    <div>
      <Card
        style={{
          width: 'auto',
          height: '12.5vh'
        }}
      >
        <CardBody>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <Link
              to={`/${data.user_id}`}
              style={{ textDecoration: 'none' }}
            >
              <div>
                <img
                  alt="Card image"
                  src={`https://picsum.photos/40/40?random=${Math.random() * 100}`}
                  style={{
                    borderRadius: '50%',
                  }}
                />
              </div>
            </Link>
            <div
              style={{
                display: 'block', marginTop: 'auto',
                marginBottom: 'auto'
              }}
            >
              <Link
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginLeft: '8px',
                  color: 'black'
                }}
                to={`/${data.user_id}`}
              >
                {data.first_name + " " + data.last_name}
              </Link>
            </div>
          </div>
          <div style={{ height: '1vh' }} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'left',
              fontSize: '1.5vh',
              marginLeft: '-0.6vw'
            }}
          >
            <div style={{ padding: '0px 12px 0px 12px', borderRight: '0.1px solid black' }}>{`Level: ${level}`}</div>
            <div style={{ padding: '0px 12px 0px 12px' }}>{`Points: ${points}`}</div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default MiniProfile;