import React from 'react'
import GridCardHeader from '../../Common/GridCardHeader'

interface ITimetableProps {
  data: string | null
}

function MiniTimeTable(props: ITimetableProps) {
  const { data } = props;

  return (
    <>
      <GridCardHeader text='Timetable' />
      <div>{data}</div>
    </>
  )
}

export default MiniTimeTable