import Sidebar from "./Sidebar/Sidebar";
import './homeLayout.scss'
import { Route, Routes } from "react-router-dom";
import Chat from "../MessageComponents/Chat/Chat";
import Home from "./Home/Home";
// import ChatList from "../MessageComponents/ChatList/ChatList";
// import RecomendatedList from "./Home/RecomendatedList/RecomendatedList";
import GameList from "../GameList/GameList";
import GameSnake from "../GameList/SnakeGame/SnakeGame";

const HomeLayout = () => {
    return (
        <div className="container-fluid home__layout">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 p-0">
                    <Routes>
                        <Route path="/message" element={<Chat />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/game" element={<GameList />} />
                        <Route path="/game/snake" element={<GameSnake />} />
                    </Routes>
                </div>
                {/* <div className="col-md-3 p-0">
                    <Routes>
                        <Route path="/message" element={<ChatList />} />
                        <Route path="/home" element={<RecomendatedList />} />
                        <Route path="/game/snake" element={<GameList />} />
                    </Routes>
                </div> */}
            </div>
        </div>
    );
}

export default HomeLayout;