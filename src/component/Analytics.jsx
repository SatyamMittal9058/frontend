import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Analytics = () => {
    const userData=JSON.parse(localStorage.getItem('userInfo'));
    const userId=userData._id;
    const [data,setData]=useState();
    const AnalyticsOfUser=async()=>{
        const response=await axios.get(`http://localhost:4000/short/analytics/${userId}`);
        setData(response.data.userLinkAnalytics);
    }
    
    useEffect(()=>{
      AnalyticsOfUser();
    },[]);
  return data===null?<h1 className="flex justify-center font-bold">Processing...</h1>:(
    <div className="bg-blue-500 h-screen border border-gray-800">
      <h1 className="border border-gray-500 text-3xl text-yellow-400 p-2 flex justify-center bg-black">Clicks per Link</h1>
      {data && data.map((userAnalytics)=>(
        <>
        <div className="flex justify-between p-4">
        <h1 className="text-xl text-black font-bold">OriginalUrl: {userAnalytics.originalUrl}</h1>
        <h1 className="text-xl text-black font-bold">Clicks: {userAnalytics.analytics.clicks}</h1>
        </div>
        </>
      ))}
    </div>
  )
}

export default Analytics;