import { useState } from "react";
import style from './styles/LofinForm.module.scss'
import { Link } from "react-router-dom";
import FastSingIn from "../FastSingIn/FastSingIn";

const LoginForm = () => {

    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Тут логіка відправки даних на сервер
        // Наприклад, fetch або axios для відправки запиту
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className={style.login__title}>Welcome back!</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">
                                <input type="email" placeholder="Your email" id="email" name="email" required onChange={handleInputChange} />
                            </label>
                            <label htmlFor="password">
                                <input type="password" placeholder="Your password" id="password" name="password" required onChange={handleInputChange} />
                            </label>
                            <input type="submit" value="Login" />
                            <a className={style.forgot__password} href="forgot-password">Forgot password?</a>
                        </form>

                        <FastSingIn />
                    </div>
                </div>

                <div className={style.recomendation}>
                    <p>Don’t have an account ? <Link className={style.recomendation__link} to="/sing-up"><strong>Sign Up</strong></Link></p>
                </div>
            </div>
        </>
    );
}

export default LoginForm;