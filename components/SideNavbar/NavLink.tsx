import Link from 'next/link';
import React from 'react'

interface INavLinkProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
    text: string,
    link: string,
    icon?: React.ReactNode
  }

function NavLink(props: INavLinkProps) {
  const { text, icon, link } = props;

  return (
    <Link href={link}>
      <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
        {icon}
        <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
          {text}
        </h3>
      </div>
    </Link>
  )
}

export default NavLink