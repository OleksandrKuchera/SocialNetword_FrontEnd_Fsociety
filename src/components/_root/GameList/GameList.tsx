import { Nav } from "react-bootstrap";
import snakeAvatar from '../../../assets/Snake_OG-logo.jpeg'
import minesweeperAvatar from '../../../assets/Minesweeper_OG-logo.png'
import styled from "./style.module.scss";
import { Link } from "react-router-dom";


const GameList = () => {
    return (
        <div className={styled.games}>
            <h2 className={styled.games__title}>Games List</h2>
            <div className="row">
                <div className="col-4">
                    <Nav>
                        <Link to={'/game/snake'}>
                            <div className={styled.game__container}>
                                <img src={snakeAvatar} alt="gameImg" className={styled.game__img} />
                                <p className={styled.game__name} >Snake</p>
                            </div>
                        </Link>
                    </Nav>
                </div>
                <div className="col-4">
                    <Nav>
                        <Link to={'/game/minesweeper'}>
                            <div className={styled.game__container}>
                                <img src={minesweeperAvatar} alt="gameImg" className={styled.game__img} />
                                <p className={styled.game__name} >Minesweeper</p>
                            </div>
                        </Link>
                    </Nav>
                </div>
            </div>
        </div>
    );
}

export default GameList;