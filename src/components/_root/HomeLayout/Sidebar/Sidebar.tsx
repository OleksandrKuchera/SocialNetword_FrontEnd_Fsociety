import logo from '../../../../assets/FS2D2.png'
import style from './style.module.scss';
import { Button, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Error, ExitToAppRounded, Gamepad, Home, Message, People, Person } from '@mui/icons-material';



const Sidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handdleLogOut = () => {
        navigate('/login');
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
                        <Link to="/society" className={pathname === '/society' ? style.activeLink : ''}>
                            <People className={style.nav__icon} />
                            Society
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
                        <Link to="/license" className={pathname.startsWith('/license') ? style.activeLink : ''}>
                            <Error className={style.nav__icon} />
                            About product
                        </Link>

                    </Nav>
                    <div className='d-flex align-items-center justify-content-center'>
                        <Button onClick={handdleLogOut} className={style.log__out}>
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
