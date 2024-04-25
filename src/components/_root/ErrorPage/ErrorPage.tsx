import style from '../AboutProduct/aboutProduct.module.scss';
import logo from '../../../assets/FSLogo2.png';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login');
    }


    return (
        <div className='d-flex justify-content-center'>
            <div className={style.about__layout}>
                <div className={style.about__container}>
                    <div className='d-flex justify-content-center'>
                        <div className={style.logo__container}>
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex justify-content-center align-items-center">
                            <div className={style.error__container}>
                                <h1>Upps! You are not logged in! ☹ </h1>
                                <button onClick={handleClick}>Go to login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage;