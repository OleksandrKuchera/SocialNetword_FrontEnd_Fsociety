import logo from '../../../../assets/FSLogo2.png'
import style from './style.module.scss';
import { Button, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Error, ExitToAppRounded, Gamepad, Home, Message, People, Person, SlideshowOutlined } from '@mui/icons-material';
import axios from 'axios';



const Sidebar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }
            await axios.post('https://socialnetword-fsociety.onrender.com/api/logout/', {
                account_token: accessToken
            });
            localStorage.removeItem('accessToken');
            navigate('/login');
            window.location.reload();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <aside>
            <div className={style.sidebar}>
                <div className={style.logo__container}>
                    <img src={logo} alt="logo" />
                    <figcaption>Fsociety</figcaption>
                </div>
                <div className={style.btn__container}>
                    <Nav defaultActiveKey="/home" className={style.nav__bar}>
                        <Link to="/home" className={pathname === '/home' ? style.activeLink : ''}>
                            <Home className={style.nav__icon} />
                            Home
                        </Link>
                        <Link to="users-list/society" className={pathname === 'users-list/society' ? style.activeLink : ''}>
                            <People className={style.nav__icon} />
                            Society
                        </Link>
                        <Link to="/reels" className={pathname === 'reels' ? style.activeLink : ''}>
                            <SlideshowOutlined className={style.nav__icon} />
                            Reels
                        </Link>
                        <Link to="/my-profile" className={pathname === '/my-profile' ? style.activeLink : ''}>
                            <Person className={style.nav__icon} />
                            My Profile
                        </Link>
                        <Link to="/message" className={pathname === '/message' ? style.activeLink : ''}>
                            <Message className={style.nav__icon} />
                            Message
                        </Link>
                        <Link to="/game" className={pathname.startsWith('/game') ? style.activeLink : ''}>
                            <Gamepad className={style.nav__icon} />
                            Game
                        </Link>
                        <Link to="/about-product" className={pathname === '/about-product' ? style.activeLink : ''}>
                            <Error className={style.nav__icon} />
                            About product
                        </Link>

                    </Nav>
                    <div className='d-flex align-items-center justify-content-center'>
                        <Button onClick={handleLogout} className={style.log__out}>
                            <ExitToAppRounded />
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
