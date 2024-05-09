import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, HashRouter as Router } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout/AuthLayout';
import HomeLayout from './_root/HomeLayout/HomeLayout';
import Chat from './_root/MessageComponents/Chat/Chat';
import Home from './_root/Home/Home';
import GameList from './_root/GameList/GameList';
import GameSnake from './_root/GameList/SnakeGame/SnakeGame';
import ConfirmEmail from './_auth/ConfirmEmail/ConfirmEmail';
import MyProfile from './_root/MyProfile/MyProfile';
import UserProfile from './_root/UserProfile/UserProfile';
import AboutProduct from './_root/AboutProduct/AboutProduct';
import LoginForm from './_auth/form/LoginForm';
import RegistrationForm from './_auth/form/RegistrationForm';
import ForgotPassword from './_auth/form/ForgotPassword';
import ResetPassword from './_auth/form/ResetPassword';
import SuccessfullyConfirmedEmail from './_auth/SuccessfullyConfirmedEmail/SuccessfullyConfirmedEmail';
import ConfirmRequestNotFound from './_auth/ConfirmRequestNotFound/ConfirmRequestNotFound';
import SuccessfullyResetPassword from './_auth/SuccessfullyResetPassword/SuccessfullyResetPassword';
import ErrorPage from './_root/ErrorPage/ErrorPage';
import FrendList from './_root/FriendList/FriendList';


const AppContainer = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAccessToken();
        const intervalId = setInterval(() => {
            checkAccessToken();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const checkAccessToken = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error checking accessToken:', error);
        }
    };


    return (
        <Router>
            <main style={{ height: '100vh' }}>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/" element={<Navigate to="/register" />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>

                    {isAuthenticated ? (
                        <Route element={<HomeLayout />}>
                            <Route path="/message" element={<Chat />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/reels" element={<Home />} />
                            <Route path="/game" element={<GameList />} />
                            <Route path="/my-profile" element={<MyProfile />} />
                            <Route path="/profile/:userName" element={<UserProfile />} />
                            <Route path="/game/snake" element={<GameSnake />} />
                            <Route element={<FrendList />}>
                                <Route path="users-list/:type" element={<FrendList />} />
                                <Route path="/:userNameParams/:type" element={<FrendList />} />
                            </Route>
                            <Route path="/about-product" element={<AboutProduct />} />
                            {/* Add any other authenticated routes here */}
                        </Route>
                    ) : (
                        <Route path="*" element={<ErrorPage />} />
                    )}

                    <Route path="/confirm-email" element={<ConfirmEmail />} />
                    <Route path="/successfully-confirmed-email" element={<SuccessfullyConfirmedEmail />} />
                    <Route path="/confirm-request-not-found" element={<ConfirmRequestNotFound />} />
                    <Route path="/successfully-reset-password" element={<SuccessfullyResetPassword />} />
                    

                    {/* Redirect to error page for any other unmatched routes */}
                    <Route path="*" element={<Navigate to='/error' replace />} />
                </Routes>
            </main>
        </Router>
    );
};

export default AppContainer;
