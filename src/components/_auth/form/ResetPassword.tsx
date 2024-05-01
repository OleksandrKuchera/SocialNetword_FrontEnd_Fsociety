import { useState } from "react";
import style from './styles/LofinForm.module.scss'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Error } from "@mui/icons-material";

const ResetPassword = () => {

    const [registrationData, setRegistrationData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',

    });

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({
            ...registrationData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Перевірка на збіг паролів
        if (registrationData.password !== registrationData.confirmPassword) {
            setError('Паролі не збігаються');
            return;
        }

        // Перевірка на довжину пароля
        if (registrationData.password.length < 8) {
            setError('Пароль повинен бути не менше 8 символів');
            return;
        }

        // Перевірка на складність пароля
        if (!/[a-z]/.test(registrationData.password) ||
            !/[A-Z]/.test(registrationData.password) ||
            !/[0-9]/.test(registrationData.password)) {
            setError('Пароль повинен містити принаймні одну маленьку літеру, одну велику літеру та одну цифру');
            return;
        }

        try {
            const response = await axios.post('http://socialnetword-fsociety.onrender.com/api/register/', registrationData);
            navigate("/confirm-email");
            // мб буде ще якийсь функціонал, який буде перевіряти токен користувача
            console.log(response.data);


        } catch (error) {
            console.error('Помилка під час реєстрації:', error);
            setError('Помилка під час реєстрації');
        }
    };


    return (
        <>
            <h2 className={style.login__title}>Write new password.</h2>

            <form onSubmit={handleSubmit}>
                {error && <div  className={style.error} ><Error/><p>{error}</p></div>}
                <label htmlFor="password">
                    <input type="password" placeholder="Your password" id="password" name="password" required onChange={handleInputChange} />
                </label>
                <label htmlFor="confirmPassword">
                    <input type="password" placeholder="Confirm your password" id="confirmPassword" name="confirmPassword" required onChange={handleInputChange} />
                </label>
                <input type="submit" value="Reset password" />
            </form>
        </>
    );
}

export default ResetPassword;