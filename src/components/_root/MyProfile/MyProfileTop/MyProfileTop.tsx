import { Add, CalendarMonthOutlined, LocationOnOutlined } from '@mui/icons-material';
import avatar from '../../../../assets/avatar.png'
import style from './style.module.scss';
import { Divider } from '@mui/material';
import EditMyProfile from '../EditMyProfile/EditMyProfile';

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
                                <EditMyProfile/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            <p className={style.profile__count}><span>3</span>Posts</p>
                            <p className={style.profile__count}><span>228</span>Friends</p>
                            <p className={style.profile__count}><span>414</span>Followers</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={style.profile__count__container}>
                        <div className="row">
                            <div className="col-3">
                                <p className={style.profile__count}><LocationOnOutlined />Otiniya, Ukraine</p>
                            </div>
                            <div className="col-3">
                                <p className={style.profile__count}><CalendarMonthOutlined />14.02.2003</p>
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