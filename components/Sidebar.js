import Image  from 'next/image';
import SidebarMenuItem from './SidebarMenuItem';
import { HomeIcon} from "@heroicons/react/solid"
import {
    BellIcon,
    BookmarkIcon,
    ClipboardIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    HashtagIcon,
    InboxIcon,
    UserIcon,} from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div className='hidden sm:flex flex-col p-2 lg:items-start fixed h-full xl:ml-24'>
        {/* twitter logo */}
        <div className='hoverEffect hover:bg-blue-200 p-0'>
        <Image src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" width="50" height="50" alt="logo"></Image>
        </div>
        {/* menu */}
        <div className='mt-4 mb-2.5 '>
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
        </div>
        {/* button  */}
        <button className='text-white rounded-full bg-blue-500 w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline '>Tweet</button>
        {/* profile */}
        <div className='hoverEffect text-gray-700 flex items-center mt-auto '>
            <img src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80" className="h-10 w-10 rounded-full xl:mr-2" alt="user"/>
            <div className='leading-5 hidden xl:inline'>
                <h4 className='font-bold'>Roshan Tiwary</h4>
                <p className='text-gray-500'>@roshantiwary404</p>
            </div>
            <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline'/>
        </div>
    </div>
  )
}

export default Sidebar