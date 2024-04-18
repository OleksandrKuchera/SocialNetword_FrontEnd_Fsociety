import { CalendarMonthOutlined, LocationOnOutlined } from '@mui/icons-material';
import style from './style.module.scss';
import { Divider } from '@mui/material';
import EditMyProfile from '../EditMyProfile/EditMyProfile';
import { NavLink } from 'react-router-dom';
import AddPost from '../AddPost/AddPost';

type UserProfileTopProps = {
    userData: userDataType;
}

type userDataType = {
    name: string,
    postCount: number,
    friendsCount: number,
    followersCount:number,
    located: string,
    birth_date: string,
    bio: string,
    avatar: string,
    friends_count : number,
    subscribers_count : number,
}

const MyProfileTop : React.FC<UserProfileTopProps> = ({ userData }) => {

    
return (
        <div className={style.profile__container}>
            {userData && (
                <>
                    <div className="row">
                        <div className="col-12"></div>
                        <div className="col-2">
                        <img className={style.avatar} src={userData.avatar.slice(13)} alt="avatar" />
                        </div>
                        <div className="col-10 d-flex flex-column justify-content-around">
                            <div className={style.name__container}>
                                <div className="row d-flex justify-content-between">
                                    <div className="col-4">
                                        <h2>{userData.name}</h2>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <AddPost userName={userData.name}/>
                                        <EditMyProfile/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <p  className={style.profile__count}><span>{userData.postCount || 0}</span>Posts</p>
                                    <NavLink to='/friends' className={style.profile__count}><span>{userData.friends_count ||0}</span>Friends</NavLink>
                                    <NavLink  to='/followers' className={style.profile__count}><span>{userData.followersCount ||0}</span>Followers</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={style.profile__count__container}>
                                <div className="row">
                                    <div className="col-3">
                                        <p className={style.profile__count}><LocationOnOutlined />{userData.located}</p>
                                    </div>
                                    <div className="col-3">
                                        <p className={style.profile__count}><CalendarMonthOutlined />{userData.birth_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={style.profile__description}>
                                <p>{userData.bio}</p>
                            </div>
                        </div>
                    </div>
                    <Divider className={style.divider}/>
                </>
            )}
        </div>
    );
}

export default MyProfileTop;