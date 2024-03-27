import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import logo from '../../../assets/FSLogo2.png';


const SuccessfullyConfirmedEmail = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div className={style.layout}>
            <div>
            <div className={style.confirm__container}>
                <img src={logo} alt="mail" />
                <h2>Email successfully confirmed.</h2>
                <p>Go to login page to sign in.</p>
            </div>
            </div>
            <button onClick={handleClick}>Go to login</button>
        </div>
    );
}

export default SuccessfullyConfirmedEmail;