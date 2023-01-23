import Sidebar from '../components/Sidebar'
import Head from 'next/head'
import Feed from './../components/Feed';
import Widget from './../components/Widget';
import CommentModal from './../components/CommentModal';


export default function Home({newsResult,randomUser}) {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main className='flex min-h-screen m-auto'>
    {/* sidebar */}
     <Sidebar />

    {/* feed */}
      <Feed/>
    {/* modal */}
    <CommentModal/>

    {/* widget */}
    <Widget newsResult={newsResult.articles} randomUser={randomUser.results}/>
    </main>

    </>
  )
}

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps(){
  const newsResult=await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json").then(res=>res.json())
     
  const randomUser=await fetch("https://randomuser.me/api/?results=50&inc=name,login,picture").then((res)=>res.json())
  return{
    props:{
      newsResult,
      randomUser
    }
  }
} 