import React from 'react';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router';

interface ISignOutProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
    text: string,
    link: string,
    icon?: React.ReactNode
  }

function NavLink(props: ISignOutProps) {
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

  const handleSignOut = async () => {
      await signOut({
        callbackUrl: "/",
      });
    };

  return (
    <button className="w-full" onClick={() => handleSignOut()}>
      <div className={styleNames}>
        {icon}
        <h3 className={h3StyleNames}>
          {text}
        </h3>
      </div>
    </button>
  )
}

export default NavLink