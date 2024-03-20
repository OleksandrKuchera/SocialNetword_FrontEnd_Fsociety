import { useNavigate } from 'react-router-dom';
import style from './style.module.scss'


const ConfirmEmail = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return (
        <div className={style.layout}>
            <p>Перейдіть на свою електрону пошту для підтвердження.</p>
            <button onClick={handleClick}>Перейти до профілю</button>
        </div>
    );
}

export default ConfirmEmail;