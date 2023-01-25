
import React from 'react'
import { themeState } from '../atom/ThemeAtom';
import { useRecoilState } from 'recoil';
const News = ({article}) => {
  const [select] = useRecoilState(themeState)

  return (
    <a href={article.url} target="_blank" rel="noreferrer">
        <div className={`${select?"text-black bg-gray-200 hover:bg-gray-300":"text-white bg-black hover:bg-gray-800"} flex items-center justify-between px-4 py-2 space-x-1  transition duration-200`}>
            <div className='space-y-0.5'> 
                <h6 className={`${select?"text-black":"text-white"} text-sm font-bold`}>{article.title}</h6>
                <p className={`${select?"text-black":"text-white"} text-sm font-medium `}>{article.source.name}</p>
            </div>
            <img src={article.urlToImage} className= 'rounded-xl ml-auto' width="70" height="70"  alt="" />
        </div>
    </a>  
  )
}

export default News