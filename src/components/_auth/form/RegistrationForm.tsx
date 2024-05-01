import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Error } from "@mui/icons-material";
import style from './styles/LofinForm.module.scss';
import { CircularProgress } from "@mui/material";

interface RegistrationData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegistrationData({
            ...registrationData,
            [name]: value
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (registrationData.password !== registrationData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (registrationData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        if (!/[a-z]/.test(registrationData.password) ||
            !/[A-Z]/.test(registrationData.password) ||
            !/[0-9]/.test(registrationData.password)) {
            setError('Password must contain at least one lowercase letter, one uppercase letter, and one digit');
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://socialnetword-fsociety.onrender.com/api/register/', registrationData);
            navigate("/confirm-email");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data);
                setError(error.response?.data.error)
            } else {
                console.error('An unexpected error occurred:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.login_form_container}>
            {loading ? (
                <div className={style.loading}>
                    <CircularProgress color="success" />
                </div>
            ) : (
                <>
                    <h2 className={style.login__title}>Become a Sailor!</h2>
                    <form onSubmit={handleSubmit}>
                        {error && <div className={style.error}><Error /><p>{error}</p></div>}
                        <label htmlFor="email">
                            <input type="email" placeholder="Your email" id="email" name="email" required onChange={handleInputChange} value={registrationData.email} />
                        </label>
                        <label htmlFor="name">
                            <input type="text" placeholder="Your nickname" id="name" name="name" required onChange={handleInputChange} value={registrationData.name} />
                        </label>
                        <label htmlFor="password">
                            <input type="password" placeholder="Your password" id="password" name="password" required onChange={handleInputChange} value={registrationData.password} />
                        </label>
                        <label htmlFor="confirmPassword">
                            <input type="password" placeholder="Confirm your password" id="confirmPassword" name="confirmPassword" required onChange={handleInputChange} value={registrationData.confirmPassword} />
                        </label>
                        <input type="submit" value="Register" />
                    </form>
                    <div className={style.recomendation}>
                        <p>Already have an account? <Link className={style.recomendation__link} to="/login"><strong>Sign In</strong></Link></p>
                    </div>
                </>
            )}
        </div>
    );
};

export default RegistrationForm;
