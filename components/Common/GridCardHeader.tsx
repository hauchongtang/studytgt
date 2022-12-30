import React from 'react'

interface IGridCardHeaderProps {
  text: string,
  link: string
}

function GridCardHeader(props: IGridCardHeaderProps) {
  const { text, link } = props;

  return (
    <header className="flex space-x-1 px-5 py-4 border-b border-slate-100">
      <h2 className="font-semibold text-slate-800">{text}</h2>
      {link ? <a href={link}>↗️</a> : null}
    </header>
  )
}

export default GridCardHeader