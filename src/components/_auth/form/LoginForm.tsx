import { useState } from "react";
import style from './styles/LofinForm.module.scss'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Error } from "@mui/icons-material";

const LoginForm = () => {

    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', loginData);
            localStorage.setItem('accessToken', response.data.accessToken);
            setTimeout(() => {
                navigate('/home');
            },2000)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
                setError(error.response?.data.error)
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className={style.login__title}>Welcome back!</h2>
                        <form onSubmit={handleSubmit}>
                            {error && <div className={style.error} ><Error /><p>{error}</p></div>}
                            <label htmlFor="email">
                                <input type="email" placeholder="Your email" id="email" name="email" required onChange={handleInputChange} />
                            </label>
                            <label htmlFor="password">
                                <input type="password" placeholder="Your password" id="password" name="password" required onChange={handleInputChange} />
                            </label>
                            <input type="submit" value="Login" />
                            <a><Link className={style.forgot__password} to="/forgot-password">Forgot password?</Link></a>
                        </form>
                    </div>
                </div>

                <div className={style.recomendation}>
                    <p>Don’t have an account ? <Link className={style.recomendation__link} to="/register"><strong>Sign Up</strong></Link></p>
                </div>
            </div>
        </>
    );
}

export default LoginForm;