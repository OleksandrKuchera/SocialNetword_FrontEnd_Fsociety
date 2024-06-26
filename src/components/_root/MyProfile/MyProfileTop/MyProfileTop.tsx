import { CalendarMonthOutlined, InsertPhoto, LocationOnOutlined, PhotoCameraFront } from '@mui/icons-material';
import style from './style.module.scss';
import { Divider } from '@mui/material';
import EditMyProfile from '../EditMyProfile/EditMyProfile';
import { NavLink } from 'react-router-dom';
import AddPost from '../AddPost/AddPost';
import { userDataType } from '../../HomeLayout/HomeLayout';
import { postOrReelsType } from '../MyProfile';

type UserProfileTopProps = {
    userData: userDataType,
    postOrReels: postOrReelsType,
    setPostOrReels: (typPost: postOrReelsType) => void,
}


const MyProfileTop: React.FC<UserProfileTopProps> = ({ userData, postOrReels, setPostOrReels }) => {


    return (
        <div className={style.profile__container}>
            {userData && (
                <>
                    <div className="row">
                        <div className="col-12"></div>
                        <div className="col-2">
                            <div className={style.avatar__container}>
                                <img className={style.avatar} src={userData.avatar.slice(13)} alt="avatar" />
                            </div>
                        </div>
                        <div className="col-10 d-flex flex-column justify-content-around">
                            <div className={style.name__container}>
                                <div className="row d-flex justify-content-between">
                                    <div className="col-4">
                                        <h2>{userData.name}</h2>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end">
                                        <AddPost userName={userData.name} />
                                        <EditMyProfile />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-between">
                                    <p className={style.profile__count}><span>{userData.post_count|| 0}</span>Posts</p>
                                    <NavLink to={`/${userData.name}/friends`}  className={style.profile__count}><span>{userData.friends_count || 0}</span>Friends</NavLink>
                                    <NavLink to={`/${userData.name}/followers`}  className={style.profile__count}><span>{userData.subscribers_count || 0}</span>Followers</NavLink>
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
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <button className={postOrReels == 'post' ? style.change__post__type__btn__active : style.change__post__type__btn} onClick={() => {setPostOrReels('post')}}>
                                <InsertPhoto/>
                            </button>
                        </div>
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <button className={postOrReels == 'reels' ? style.change__post__type__btn__active : style.change__post__type__btn} onClick={() => {setPostOrReels('reels')}}>
                                <PhotoCameraFront/>
                            </button>
                        </div>
                    </div>
                    <Divider className={style.divider} />
                </>
            )}
        </div>
    );
}

export default MyProfileTop;