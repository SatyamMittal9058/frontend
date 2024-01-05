import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector} from 'react-redux';
import {backendURL} from './backendApi';

const Analytics = () => {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userData._id;
  const [data, setData] = useState();
  const AnalyticsOfUser = async () => {
    const response = await axios.get(`${backendURL}/short/analytics/${userId}`);
    setData(response.data.userLinkAnalytics);
  }

  useEffect(() => {
    AnalyticsOfUser();
  }, []);
  return data === null ? <h1 className="flex justify-center font-bold">Processing...</h1> : (
    <div className="bg-blue-500  md:w-full md:h-screen border border-gray-800 ">
      <h1 className="border border-gray-500 text-3xl text-yellow-400 p-2 flex justify-center bg-black">Clicks per Link</h1>
      {data && data.map((userAnalytics) => (
        <>
          <div className="flex flex-col p-4 break-auto">
            <div className="">
              <div className="text-xl text-black font-bold">OriginalUrl: {userAnalytics.originalUrl}</div>
              <div className="text-xl text-white font-semibold underline">Clicks: {userAnalytics.analytics.clicks}</div>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export default Analytics;