import { SparklesIcon } from "@heroicons/react/outline"
import Input from "./Input"
import Post from "./Post"

function Feed() {

  const posts=[
    {
      id:1,
      name:"Roshan",
      userName:"roshantiwary404",
      userImg:"https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80",
      img:"https://images.unsplash.com/photo-1497752531616-c3afd9760a11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=600",
      text:"wow!",
      timestamp:"2 hours ago"
    },
    {
      id:2,
      name:"Roshan",
      userName:"roshantiwary404",
      userImg:"https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80",
      img:"https://images.unsplash.com/photo-1603632088148-3680d7e5dda2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fGFuaW1hbHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      text:"wow!",
      timestamp:"2 hours ago"
    }
  ]

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky z-99 bg-white top-0 border-b border-gray-200">
        <h2 className="sm:text-lg xl:text-xl cursor-pointer font-bold">Home</h2>
        <div className="hoverEffect ml-auto flex items-center justify-center px-0 w-9 h-9"><SparklesIcon className="h-5"/></div>
      </div>

      <Input/>

      {posts.map(post=>(
        <Post key={post.id} post={post} />
      ))}
      
    </div>
  )
}

export default Feed
