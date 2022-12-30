import React from 'react'
import GridCardHeader from '../../Common/GridCardHeader'

interface ITimetableProps {
  timetable: {
    url: string,
    moduleData: IModuleProps[]
  }
}

interface IModuleProps {
    moduleCode: string,
    moduleInfo: object
}

function MiniTimeTable(props: ITimetableProps) {
  const { timetable } = props;
  console.log(timetable)
  return (
    <>
      <GridCardHeader text='Timetable' />
      <div>
        {timetable.moduleData.map((item: IModuleProps, idx: number) => {
          return (
            <p>
              {item.moduleCode}
            </p>
          )
        })}
      </div>
    </>
  )
}

export default MiniTimeTable