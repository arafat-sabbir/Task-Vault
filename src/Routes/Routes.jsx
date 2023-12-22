import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import SignIn from "../Pages/SignIn/signIn";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Tasks from "../Pages/Dashboard/Tasks/Tasks";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";

const routes = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            }
        ]
    },
    {
        path:"/signIn",
        element:<SignIn></SignIn>
    },
    {
        path:"/signUp",
        element:<SignUp></SignUp>
    },
    {
        path:"dashboard",
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'tasks',
                element:<PrivateRoute><Tasks></Tasks></PrivateRoute>
            }
        ]
    }
])


export default routes;