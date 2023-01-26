import React from 'react'
import { themeState } from '../atom/ThemeAtom';
import { useRecoilState } from 'recoil';
const SidebarMenuItem = ({text,Icon,active}) => {
  const [select] = useRecoilState(themeState)

  return (
    <div className={`${select?"text-black hover:bg-gray-200":"text-white hover:bg-gray-800"} hoverEffect flex sm:space-x-3  sm:text-lg`}>
       <Icon className="sm:h-7 xs:h-5 "/>
        <span className={`${active && "font-bold"} hidden lg:inline`}>{text}</span>
    </div>
  )
}

export default SidebarMenuItem