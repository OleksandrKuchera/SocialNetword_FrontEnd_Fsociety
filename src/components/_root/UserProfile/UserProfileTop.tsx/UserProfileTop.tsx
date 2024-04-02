import { CalendarMonthOutlined, LocationOnOutlined, Message } from '@mui/icons-material';
import avatar from '../../../../assets/avatar.png'
import style from '../../MyProfile/MyProfileTop/style.module.scss';
import { Divider } from '@mui/material';
import { userDataType } from '../UserProfile';

type UserProfileTopProps = {
    userData: userDataType;
}

const UserProfileTop: React.FC<UserProfileTopProps> = ({ userData }) => {
    return (
        <div className={style.profile__container}>
            {userData && (
                <>
                    <div className="row">
                        <div className="col-12"></div>
                        <div className="col-2">
                            <img className={style.avatar} src={avatar} alt="avatar" />
                        </div>
                        <div className="col-10 d-flex flex-column justify-content-around">
                            <div className={style.follow__btn}>
                                <div className="row d-flex justify-content-between">
                                    <div className="col-4">
                                        <h2>{userData.name}</h2>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <button><Message /></button>
                                        {userData.isFollow ? <button>Unfollow</button> : <button className={style.unfollow__btn}>Follow</button>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <p className={style.profile__count}><span>{userData.postCount}</span>Posts</p>
                                    <a className={style.profile__count}><span>{userData.friendsCount}</span>Friends</a>
                                    <a className={style.profile__count} href=""><span>{userData.followersCount}</span>Followers</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={style.profile__count__container}>
                                <div className="row">
                                    <div className="col-3">
                                        <a className={style.profile__count} href=""><LocationOnOutlined />{userData.located}</a>
                                    </div>
                                    <div className="col-3">
                                        <a className={style.profile__count} href=""><CalendarMonthOutlined />{userData.birth_date}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Divider />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>{userData.bio}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default UserProfileTop;
