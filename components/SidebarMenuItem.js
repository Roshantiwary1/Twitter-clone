import React from 'react'
import { themeState } from '../atom/ThemeAtom';
import { useRecoilState } from 'recoil';
const SidebarMenuItem = ({text,Icon,active}) => {
  const [select] = useRecoilState(themeState)

  return (
    <div className={`${select?"text-black hover:bg-gray-200":"text-white hover:bg-gray-800"} hoverEffect flex space-x-3 text-lg`}>
       <Icon className="h-7"/>
        <span className={`${active && "font-bold"} hidden lg:inline`}>{text}</span>
    </div>
  )
}

export default SidebarMenuItem