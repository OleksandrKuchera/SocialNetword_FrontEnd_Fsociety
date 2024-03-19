import Game from './game/Game';
import './style.scss';


const GameSnake = () => {

    return (
        <div className='snake__container'>
            <h2 style={{margin:'20px', fontSize: '25px'}}>Snake Game</h2>
            <p>W,S,D,A - for move</p>
            <Game/>
        </div>  
    );
}

export default GameSnake;
