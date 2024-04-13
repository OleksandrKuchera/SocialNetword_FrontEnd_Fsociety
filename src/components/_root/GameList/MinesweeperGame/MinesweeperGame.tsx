import Game from './minesweeper/src/App';
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
