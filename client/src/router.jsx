import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from './views/pages/home/Home';
import Login from './views/pages/login/Login';
import Register from './views/pages/register/Register';
import NotFound from './views/pages/notfound/NotFound';
import PageLayout from "./views/pages/layout/PageLayout";
import ProFile from "./views/pages/profile/ProFile";

const user = true;
const ProtectedRoute = ({children}) => {
    if(!user) {
        return <Navigate to="/login" />;
    }
    return children
}
const router = createBrowserRouter([
    {
        path: '/',
        element:<ProtectedRoute><PageLayout /></ProtectedRoute>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/profile/:id',
                element: <ProFile />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export default router;