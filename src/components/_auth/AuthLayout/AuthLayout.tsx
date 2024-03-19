import logo from '../../../assets/FSLogo2.png';
import { Row, Col } from 'react-bootstrap';
import styles from './styles.module.scss';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <main className={styles.wrapper}>
            {/* background blur circle */}
            <span className={styles.blur__circle__1}></span>
            <span className={styles.blur__circle__2}></span>
            <span className={styles.blur__circle__3}></span>
            <span className={styles.blur__circle__4}></span>
            <span className={styles.blur__circle__5}></span>

            <Row className='d-flex justify-content-center z-1'>
                <Col lg='6'>

                    <section className={styles.login__container}>
                        <div className={styles.logo__container}>
                            <img src={logo} alt="logo" />
                        </div>

                        <Outlet/>

                    </section>

                </Col>
            </Row>

        </main>
    );
};

export default AuthLayout;
