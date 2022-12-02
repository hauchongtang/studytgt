import React from 'react'

interface IGridCardHeaderProps {
  text: string
}

function GridCardHeader(props: IGridCardHeaderProps) {
  const { text } = props;

  return (
    <header className="px-5 py-4 border-b border-slate-100">
      <h2 className="font-semibold text-slate-800">{text}</h2>
    </header>
  )
}

export default GridCardHeader