import Game from './Solitaire/src/Gameboard/Gameboard'
import './style.scss';


const Solitaire = () => {

    return (
        
        <div className='game__container'>
            <h2 style={{margin:'20px', fontSize: '25px'}}>Solitaire Game</h2>
            <Game/>
        </div> 
    );
}

export default Solitaire;
