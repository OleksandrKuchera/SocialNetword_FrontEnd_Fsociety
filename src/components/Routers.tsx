import { Navigate, HashRouter as Router } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout/AuthLayout";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./_auth/form/LoginForm";
import RegistrationForm from "./_auth/form/RegistrationForm";
import HomeLayout from "./_root/HomeLayout/HomeLayout";
import Chat from "./_root/MessageComponents/Chat/Chat";
import Home from "./_root/HomeLayout/Home/Home";
import GameList from "./_root/GameList/GameList";
import GameSnake from "./_root/GameList/SnakeGame/SnakeGame";
import ConfirmEmail from "./_auth/ConfirmEmail/ConfirmEmail";


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
                    </Route>
                    <Route path="/confirm-email" element={<ConfirmEmail/>} />
                    <Route element={<HomeLayout />}>
                        <Route path="/message" element={<Chat />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/game" element={<GameList />} />
                        <Route path="/game/snake" element={<GameSnake />} />
                    </Route>
                </Routes>
            </main>
        </Router>
    );
}

export default AppContainer;