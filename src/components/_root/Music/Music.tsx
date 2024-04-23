import style from './style.module.scss'
import { Search } from '@mui/icons-material';
//import logo from '../../../assets/FSLogo2.png';

const Music = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div className={style.page__layout}>
                <div className={style.page__container}>
                    <div className='d-flex justify-content-center'>
                        <div className={style.search__layout}>
                            <div className={style.search__container}>
                                <div className={style.search__icon}>
                                    <Search/>
                                </div>
                                <input className={style.search__bar} placeholder="Search"/>
                            </div>
                        </div>
                    </div>
                    Music page
                    {/* <div className="row">
                        <div className="d-flex align-items-center">
                            <div className={style.text__layout}>
                                <div className={style.text__container__product}>
                                    <div className={style.text__section}>
                                        <h2>About Our Product:</h2>
                                    </div>
                                    <div className={style.text__section}>
                                        <h3>Welcome to the "About Our Product" page! We are excited to introduce you to our offerings, designed to make your life easier and provide you with the latest and most effective </h3>
                                        <h3>Our team is committed to developing innovative products that meet modern demands and user needs. We strive to provide you with convenience, efficiency, and safety in using our products.</h3>
                                        <h3>Whether you're looking for entertainment, work tools, or communication platforms, we have something for you. From exciting games to powerful business tools, you'll find everything you need to achieve your goals.</h3>
                                        <h3>We take pride in our products and are always ready to answer your questions and assist you with any inquiries. Join our community today and learn more about how our product can positively impact your life!</h3>
                                    </div>
                                    <div className={style.text__section}>
                                        <h2>Best regards,</h2>
                                        <h2>Fsociety Team</h2>
                                    </div>
                                </div>
                                <div className={style.text__container__team}>
                                    <div className={style.text__section}>
                                        <h2>Our team:</h2>
                                    </div>
                                    <div className={style.text__section}>
                                        <h2>Frontend:</h2>
                                        <h3>Bogdan Bayurchak</h3>
                                        <h3>Serhii Oleniak</h3>
                                    </div>
                                    <div className={style.text__section}>
                                        <h2>Backend</h2>
                                        <h3>Oleksandr Kuchera</h3>
                                    </div>
                                    <div className={style.text__section}>
                                        <h2>Site layout</h2>
                                        <h3>Maksym Kuryliuk</h3>
                                        <h3>Dariia Fomina</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Music;