import React from 'react'

const SidebarMenuItem = ({text,Icon,active}) => {
  return (
    <div className='hoverEffect flex space-x-3 text-lg text-gray-700'>
       <Icon className="h-7"/>
        <span className={`${active && "font-bold"} hidden lg:inline`}>{text}</span>
    </div>
  )
}

export default SidebarMenuItem