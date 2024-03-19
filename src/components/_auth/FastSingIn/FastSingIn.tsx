import style from './styles/fastSingIn.module.scss'
import GoogleLogo from '../../../assets/google-logo-on-transparent-white-background-free-vector.jpeg';

const FastSingIn = () => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center" >
                <div className={style.line}></div>
                <span className={style.line__text}>Or</span>
                <div className={style.line}></div>
            </div>
            <nav className={style.social__login__list}>
                <a href="https://www.google.com"><img src={GoogleLogo} alt="Google" /></a>
            </nav>
        </>
    );
}

export default FastSingIn;