import Image  from 'next/image';
import SidebarMenuItem from './SidebarMenuItem';
import { HomeIcon} from "@heroicons/react/solid"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../atom/UserAtom";
import { themeState } from '../atom/ThemeAtom';
import { useRouter } from 'next/router'
import {
    BellIcon,
    BookmarkIcon,
    ClipboardIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    HashtagIcon,
    InboxIcon,
    UserIcon,} from "@heroicons/react/outline";
   
    
    const Sidebar = ({clicked}) => {
      const [select] = useRecoilState(themeState)
      console.log(clicked)
      const router = useRouter();
      const [currentUser, setCurrentUser] = useRecoilState(userState);
      const auth = getAuth();
      useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const fetchUser = async () => {
              const docRef = doc(db, "users", auth.currentUser.providerData[0].uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setCurrentUser(docSnap.data());
              }
            };
            fetchUser();
          }
        });
      }, [auth,setCurrentUser]);
    
      function onSignOut() {
        signOut(auth);
        setCurrentUser(null);
      }

      function logOut() {
        signOut(auth);
        setCurrentUser(null);
      }
      return (
        <div className={`${clicked? "flex bg-slate-500 items-center top-[0] left-0 ":"xs:hidden"} sm:flex flex-col p-2  lg:items-start fixed h-full xl:ml-24`}>
        {/* twitter logo */}
        <div className='hoverEffect xs:hidden sm:block hover:bg-blue-200 p-0'>
        <Image onClick={()=>router.push("/")} src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" width="50" height="50" alt="logo"></Image>
        </div>
        {/* menu */}
        <div className='sm:mt-4 sm:mb-2.5 xs:mb-3 xs:space-y-[14px] xs:mt-[114px] '>
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon}/>
        {currentUser && (
          <div className="xs:hidden sm:inline"><SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} /></div>
        )}
        </div>
        {/* button  */}
        {currentUser && <button onClick={logOut} className={`${select?"text-black":"text-white "} sm:rounded-full xs:rounded-xl bg-blue-500 sm:w-56 sm:h-12 xs:h-8 xs:w-[64px] xs:text-sm sm:font-bold shadow-md hover:brightness-90 sm:text-lg hidden xs:inline  `}>Logout</button>}
        {!currentUser && <button onClick={()=>router.push("/auth/signin")} className={`${select?"text-black":"text-white "} sm:rounded-full xs:rounded-lg bg-blue-500 sm:w-56 sm:h-12 xs:h-8 xs:w-[64px] xs:text-sm sm:font-bold shadow-md hover:brightness-90 sm:text-lg hidden xs:inline `}>Signin</button>}
        {/* profile */}
       {currentUser && ( <div className={`${select?"text-black hover:bg-gray-200":"text-white hover:bg-gray-800"} hoverEffect  flex items-center sm:mt-auto xs:left-[6px] `}>
            <Image height="40" width="40"  src={currentUser?.userImg} className="rounded-full xl:mr-2" alt="user"/>
            <div className='leading-5 hidden xl:inlinr'>
                <h4 className={`${select?"text-black":"text-white"} font-bold`}>{currentUser.name}</h4>
                <p className={`${select?"text-black":"text-white"}`}>@{currentUser.username}</p>
            </div>
            <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline'/>
        </div>)}
    </div>
  )
}

export default Sidebar