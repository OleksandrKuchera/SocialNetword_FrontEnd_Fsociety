import { ChangeEvent, FormEvent, useState } from "react";
import style from './styles/LofinForm.module.scss';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Error } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

const LoginForm = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://socialnetword-fsociety.onrender.com/api/login/', loginData);
            localStorage.setItem('accessToken', response.data.accessToken);
            setTimeout(() => {
                setLoading(false);
                navigate('/home');
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
                setError(error.response?.data.error);
                setLoading(false);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    return (
        <div className={style.login_form_container}>
            {loading ? (
                <div className={style.loading}>
                    <CircularProgress color="success" />
                </div>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className={style.login__title}>Welcome back!</h2>
                            <form onSubmit={handleSubmit}>
                                {error && <div className={style.error}><Error /><p>{error}</p></div>}
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
                        <p>Don’t have an account? <Link className={style.recomendation__link} to="/register"><strong>Sign Up</strong></Link></p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
