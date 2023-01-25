
import  Image  from 'next/image';
import { themeState } from '../atom/ThemeAtom';
import { useRecoilState } from 'recoil';
const User = ({user}) => {
  const [select] = useRecoilState(themeState)

  return (
    <div className={`${select?"hover:text-black hover:bg-gray-300":"hover:text-white hover:bg-[black]"} hoverEffect flex items-center px-4 py-2   cursor-pointer`}>
        <Image className="rounded-full" width="40" height="40" src={user.picture.thumbnail} alt="" />
        <div className="ml-4  truncate leading-5">
            <h4 className="font-bold hover:underline cursor-pointer text-[14px] truncate">{user.login.username}</h4>
            <h5 className={`${select?"text-black":"text-white"} text-[13px]  truncate`}>{user.name.first + " " + user.name.last}</h5>
        </div>
            <button className={`${select?"text-white bg-black":"text-black bg-white"} ml-auto font-bold  rounded-full text-sm px-3.5 py-1.5  `}>Follow</button>

    </div>
  )
}

export default User