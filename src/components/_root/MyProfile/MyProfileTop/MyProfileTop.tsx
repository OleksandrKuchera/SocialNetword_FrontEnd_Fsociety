import { Add, CalendarMonthOutlined, LocationOnOutlined } from '@mui/icons-material';
import avatar from '../../../../assets/avatar.png'
import style from './style.module.scss';
import { Divider } from '@mui/material';

const MyProfileTop = () => {
    return (
        <div className={style.profile__container}>
            <div className="row">
                <div className="col-12"></div>
                <div className="col-2">
                    <img className={style.avatar} src={avatar} alt="avatar" />
                </div>
                <div className="col-10 d-flex flex-column justify-content-around">
                    <div className={style.name__container}>
                        <div className="row d-flex justify-content-between">
                            <div className="col-4">
                                <h2>Antonio Chaplin</h2>
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                <button  title='Add post'><Add/></button>
                                <button>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <a className={style.profile__count} href=""><span>3</span>Posts</a>
                            <a className={style.profile__count} href=""><span>228</span>Friends</a>
                            <a className={style.profile__count} href=""><span>414</span>Followers</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={style.profile__count__container}>
                        <div className="row">
                            <div className="col-3">
                                <a className={style.profile__count} href=""><LocationOnOutlined />Otiniya, Ukraine</a>
                            </div>
                            <div className="col-3">
                                <a className={style.profile__count} href=""><CalendarMonthOutlined />14.02.2003</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="profile__description">
                        <p>Бійся 228 якщо пудриш носик. (мінет 20 хрн)</p>
                    </div>
                </div>
            </div>
            <Divider className={style.divider}/>
        </div>
    );
}

export default MyProfileTop;