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
                <h2>Your confirm request is not found</h2>
                <p>Go to login page to sign up.</p>
            </div>
            </div>
            <button onClick={handleClick}>Go to login</button>
        </div>
    );
}

export default ConfirmRequestNotFound;