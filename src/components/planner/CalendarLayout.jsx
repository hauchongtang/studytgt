import React from 'react'
import { Container, Row, Col } from 'reactstrap'

const CalendarLayout = ({ moduleData, uniqueModules }) => {
  const determineColor = () => {
    var moduleColorMapping = {}
    uniqueModules.forEach((item, idx) => {
      switch (idx) {
        case 0:
          moduleColorMapping[item] = '#e7bbe3'
          break;
        case 1: 
          moduleColorMapping[item] = '#7CC6FE'
          break;
        case 2: 
          moduleColorMapping[item] = '#F0EBD8'
          break;
        case 3:
          moduleColorMapping[item] = '#68EDC6'
          break;
        case 4:
          moduleColorMapping[item] = '#565676'
          break;
        case 5:
          moduleColorMapping[item] = '#E5E1EE'
          break;
        default:
          moduleColorMapping[item] = '#90bede'
      }
    })
    // console.log(moduleColorMapping)
    return moduleColorMapping;
  }
  return (
    <>
      <Container
        style={{ width: 'auto' }}
      >
        <Row
          style={{ width: '85vw' }}
        >
          {["","0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200"].map((item, idx) => {
            return (
              <Col
                style={{ marginLeft: '-30px' }}
                className=''
              >
                {item}
              </Col>
            )
          })}
        </Row>
        {moduleData != "no link" && moduleData.map((item, idx) => {
          // console.log(item)
          return (
            <Row key={idx} style={{ width: '85vw' }}>
              <Col 
                className='bg-light border'
                style={{
                  height: '100px',
                  fontSize: '1.6vh'
                }}
              >
                <div>{determineDay(moduleData.indexOf(item)+1)}</div>
              </Col>
              {item.map((data, index) => {
                return (
                  <Col
                    className={`border-top border-bottom ${(index % 2 === 1 && !data.module) ? 'bg-light' : ''}`}
                    key={index*778+3}
                    style={{ 
                      fontSize: '1.5vh', 
                      backgroundColor: data.module ? determineColor()[data.module] : '', 
                      borderLeft: data.first === true ? '0.1px solid white' : '',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    {data.first && <>
                    <div style={{ paddingTop: '4px' }}>
                      <a href={`https://nusmods.com/modules/${data.module}`}
                        style={{ color: 'black', fontWeight: 600, textDecoration: 'none' }}
                      >
                        {data.module ? data.module : ''}
                      </a>
                    </div>
                    <div style={{ paddingBottom: '4px', fontSize: '1.15vh' }}>
                      <div>{data.lessonType ? `${data.lessonType} [${data.classNo}]` : ''}</div>
                      <div>{data.venue}</div>
                    </div>
                    </>}
                  </Col>
                )
              })}
            </Row>
          )
        })}
        
      </Container>
    </>
  )
}

export default CalendarLayout

const determineDay = (value) => {
  switch (value) {
    case 1:
      return "MON"
    case 2:
      return "TUE"
    case 3:
      return "WED"
    case 4:
      return "THURS"
    case 5:
      return "FRI"
    default:
      return "Invalid Date"
  }
}

