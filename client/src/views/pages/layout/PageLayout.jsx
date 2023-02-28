import { Outlet } from 'react-router-dom';
import LeftBar from '../../components/leftbar/LeftBar';
import NavBar from './../../components/navbar/NavBar';
import RightBar from './../../components/rightbar/RightBar';
import '../../../styles.scss';
import { DarkModeContext } from './../../../context/darkModeContext';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

const PageLayout = () => {
    const queryClient = new QueryClient();
    const { darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext);
    if(!currentUser) {
        return <Navigate to="/login" />
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
                <NavBar />
                <div style={{ display: 'flex' }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                    <Outlet />
                    </div>
                    <RightBar />
                </div>
                </div>
            </div>
        </QueryClientProvider>  
    );
};

export default PageLayout;
