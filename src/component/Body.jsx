import React from 'react'
import Login from './Login'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import Analytics from './Analytics'

const Body = () => {
  const appRouter=createBrowserRouter([
        {
          path:'/',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/Home',
          element:<Home/>
        },{
          path:'/analytics',
          element:<Analytics/>
        }
  ])
  return (
    <RouterProvider router={appRouter}/>
  )
}

export default Body