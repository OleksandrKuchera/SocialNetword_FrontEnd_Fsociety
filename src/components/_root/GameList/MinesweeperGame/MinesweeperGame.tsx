import Game from './minesweeper-react-typescript/src/components/Game/index';
import './style.scss';


const MinesweeperGame = () => {

    return (
        <div className='game__container'>
            <h2 style={{margin:'20px', fontSize: '25px'}}>Minesweeper Game</h2>
            <Game/>
        </div>  
    );
}

export default MinesweeperGame;
