import { Navigate, HashRouter as Router } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout/AuthLayout";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./_auth/form/LoginForm";
import ForgotPassword from "./_auth/form/ForgotPassword";
import ResetPassword from "./_auth/form/ResetPassword";
import SuccessfullyResetPassword from "./_auth/SuccessfullyResetPassword/SuccessfullyResetPassword";
import RegistrationForm from "./_auth/form/RegistrationForm";
import HomeLayout from "./_root/HomeLayout/HomeLayout";
import Chat from "./_root/MessageComponents/Chat/Chat";
import Home from "./_root/HomeLayout/Home/Home";
import GameList from "./_root/GameList/GameList";
import GameSnake from "./_root/GameList/SnakeGame/SnakeGame";
import ConfirmEmail from "./_auth/ConfirmEmail/ConfirmEmail";
import MyProfile from "./_root/MyProfile/MyProfile";
import SuccessfullyConfirmedEmail from "./_auth/SuccessfullyConfirmedEmail/SuccessfullyConfirmedEmail";
import ConfirmRequestNotFound from "./_auth/ConfirmRequestNotFound/ConfirmRequestNotFound";
import UserProfile from "./_root/MyProfile/MyProfile";
import FrendList from "./_root/FriendList/FriendList";
import AboutProduct from "./_root/AboutProduct/AboutProduct";


const AppContainer = () => {
    return (
        <Router>
            <main style={{
                height: '100vh'
            }}>
                <Routes >
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/" element={<Navigate to="/register" />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>
                    <Route path="/confirm-email" element={<ConfirmEmail />} />
                    <Route path="/successfully-confirmed-email" element={<SuccessfullyConfirmedEmail />} />
                    <Route path="/confirm-request-not-found" element={<ConfirmRequestNotFound />} />
                    <Route path="/successfully-reset-password" element={<SuccessfullyResetPassword />} />
                    <Route element={<HomeLayout />}>
                        <Route path="/message" element={<Chat />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/game" element={<GameList />} />
                        <Route path="/my-profile" element={<MyProfile />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/game/snake" element={<GameSnake />} />
                        <Route path="/society" element={<FrendList />} />
                        <Route path="/about-product" element={<AboutProduct />} />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}

export default AppContainer;