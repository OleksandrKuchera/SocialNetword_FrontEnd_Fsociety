import logo from '../../../../assets/FS2D2.png'
import style from './style.module.scss';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad, Home, Message, People, Person } from '@mui/icons-material';



const Sidebar = () => {
    const { pathname } = useLocation(); // Get the current URL path

    return (
        <aside>
            <div className={style.sidebar}>
                <div className={style.logo__container}>
                    <img src={logo} alt="logo" />
                    <figcaption>Fsociety</figcaption>
                </div>
                <Nav defaultActiveKey="/home" className={style.nav__bar}>
                    <Link to="/home" className={pathname === '/home' ? style.activeLink : ''}>
                        <Home />
                        Home
                    </Link>
                    <Link to="/socirty" className={pathname === '/socirty' ? style.activeLink : ''}>
                        <People />
                        Society
                    </Link>
                    <Link to="/my-profile" className={pathname === '/my-profile' ? style.activeLink : ''}>
                        <Person />
                        My Profile
                    </Link>
                    <Link to="/message" className={pathname === '/message' ? style.activeLink : ''}>
                        <Message />
                        Message
                    </Link>
                    <Link to="/game" className={pathname === '/game' ? style.activeLink : ''}>
                        <Gamepad />
                        Game
                    </Link>
                </Nav>
            </div>
        </aside>
    );
}

export default Sidebar;
