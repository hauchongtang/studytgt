import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

interface INavLinkProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
    text: string,
    link: string,
    icon?: React.ReactNode
  }

function NavLink(props: INavLinkProps) {
  const { text, icon, link } = props;
  const { asPath } = useRouter();

  const style = [
    "flex",
    "mb-2",
    "justify-start",
    "items-center",
    "gap-4",
    "pl-5",
    "hover:bg-[#5534A5]",
    "p-2",
    "rounded-md",
    "group",
    "cursor-pointer",
    "hover:shadow-lg",
    "m-auto"
  ]

  const h3Style = [
    "text-base",
    "group-hover:text-white",
    "font-semibold"
  ]

  const styleNames = asPath === link 
    ? style.concat(["bg-[#5534A5]", "text-white"]).join(' ') 
    : style.join(' ');

  const h3StyleNames = asPath === link 
    ? h3Style.concat(["text-white"]).join(' ') 
    : h3Style.concat(["text-gray-900"]).join(' ');

  return (
    <Link href={link}>
      <div className={styleNames}>
        {icon}
        <h3 className={h3StyleNames}>
          {text}
        </h3>
      </div>
    </Link>
  )
}

export default NavLink