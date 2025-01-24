import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";

import Login from "../components/pages/Login/Login";
import SignUp from "../components/pages/SignUp/SignUp";
import Dashboard from "../Layouts/Dashboard";
import Home from "../components/pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import AdminRoute from "./AdminRoute";
import BookedSession from "../components/pages/Dashboard/Student/BookedSession";
import AddNote from "../components/pages/Dashboard/Student/AddNote";
import ManageNotes from "../components/pages/Dashboard/Student/ManageNotes";
import StudyMaterials from "../components/pages/Dashboard/Student/StudyMaterials";
import AddSession from "../components/pages/Dashboard/Tutor/AddSession";
import MySessions from "../components/pages/Dashboard/Tutor/MySessions";
import AddMaterials from "../components/pages/Dashboard/Tutor/AddMaterials";
import MyMaterials from "../components/pages/Dashboard/Tutor/MyMaterials";
import AllUsers from "../components/pages/Dashboard/Admin/AllUsers";
import AllSessions from "../components/pages/Dashboard/Admin/AllSessions";
import AllMaterials from "../components/pages/Dashboard/Admin/AllMaterials";
import UpdateSession from "../components/pages/Dashboard/Admin/UpdateSession";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
      ],
    },
    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/signup',
        element:<SignUp></SignUp>
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
          //student routes
          {
            path:'view-session',
            element:<StudentRoute><BookedSession></BookedSession></StudentRoute>
          },
          {
            path:'add-note',
            element:<StudentRoute><AddNote></AddNote></StudentRoute>
          },
          {
            path:'manage-notes',
            element:<StudentRoute><ManageNotes></ManageNotes></StudentRoute>
          },
          {
            path:'view-materials',
            element:<StudentRoute><StudyMaterials></StudyMaterials></StudentRoute>
          },
          // tutor routes
          {
            path:'add-session',
            element:<TutorRoute><AddSession></AddSession></TutorRoute>
          },
          {
            path:'my-sessions',
            element:<TutorRoute><MySessions></MySessions></TutorRoute>
          },
          {
            path:'add-materials',
            element:<TutorRoute><AddMaterials></AddMaterials></TutorRoute>
          },
          {
            path:'my-materials',
            element:<TutorRoute><MyMaterials></MyMaterials></TutorRoute>
          },
          // admin routes
          {
            path:'users',
            element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
          },
          {
            path:'all-sessions',
            element:<AdminRoute><AllSessions></AllSessions></AdminRoute>
          },
          {
            path:'all-sessions/:id',
            element:<AdminRoute><UpdateSession></UpdateSession></AdminRoute>
          },
          {
            path:'all-materials',
            element:<AdminRoute><AllMaterials></AllMaterials></AdminRoute>
          }
        ]
    }
  ]);