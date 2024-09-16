import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import Home from '../Pages/Home';
  import SignUp from '../Pages/SignUp';
  import Login from '../Pages/Login';
import Students from '../Pages/Students';
import Admin from '../Pages/Admin';
import Details from '../Pages/Details'
import AccptedAideas from '../Pages/AccptedAideas';
import SignAdmin from '../Pages/SignAdmin';

 function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element:<Home/>,
        },
        {
          path: "/",
          element:<Home/>,
        },
        {
          path: "/Login",
          element:<Login/>,
        },
        {
          path: "/SignUp",
          element:<SignUp/>,
        },
        {
          path: "/Student",
          element:<Students/>,
        },
        {
          path: "/Admin",
          element:<Admin/>,
        },
        {
          path: "/SignAdmin",
          element:<SignAdmin/>,
        },
        {
          path: `/Details/:id`,
          element:<Details/>,
        },
        {
          path: '/AcceptedAideas',
          element:<AccptedAideas/>,
        },
      ]);
  return (
    <div><RouterProvider router={router} /></div>
  )
}



export default Router