
import  Image  from 'next/image';
const User = ({user}) => {
  return (
    <div className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer">
        <Image className="rounded-full" width="40" height="40" src={user.picture.thumbnail} alt="" />
        <div className="ml-4  truncate leading-5">
            <h4 className="font-bold hover:underline cursor-pointer text-[14px] truncate">{user.login.username}</h4>
            <h5 className="text-[13px] text-gray-500 truncate">{user.name.first + " " + user.name.last}</h5>
        </div>
            <button className="ml-auto font-bold bg-black text-white rounded-full text-sm px-3.5 py-1.5   ">Follow</button>

    </div>
  )
}

export default User