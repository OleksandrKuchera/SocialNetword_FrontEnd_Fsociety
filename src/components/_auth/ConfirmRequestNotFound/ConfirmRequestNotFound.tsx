import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import logo from '../../../assets/FSLogo2.png';


const ConfirmRequestNotFound = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div className={style.layout}>
            <div>
            <div className={style.confirm__container}>
                <img src={logo} alt="mail" />
                <h2>Confirm your mail</h2>
                <p>Go to your email to confirm.</p>
            </div>
            </div>
            <button onClick={handleClick}>Go to login</button>
        </div>
    );
}

export default ConfirmRequestNotFound;