import { Container } from 'react-bootstrap';
// import MyProfileTop from './MyProfileTop/MyProfileTop';
import style from '../MyProfile/style.module.scss';
// import MyProfileDesc from './MyProfileDesc/MyProfileDesc';
import { MyProfileContext } from '../HomeLayout/HomeLayout';
import { useContext } from 'react';


function GroupPage() {
  const myProfile = useContext(MyProfileContext);


  return (
    <Container>
      {myProfile ?
              <div className={style.profile__container}>
                  <div className={style.profile__container}>
            <div className="row">
                <div className="col-12"></div>
                <div className="col-2">
                    <div className={style.avatar__container}>
                        {/* <img className={style.avatar} src={userData.avatar.slice(13)} alt="avatar" /> */}
                    </div>
                </div>
                <div className="col-10 d-flex flex-column justify-content-around">
                    <div className={style.name__container}>
                        <div className="row d-flex justify-content-between">
                            <div className="col-4">
                                {/* <h2>{userData.name}</h2> */}
                            </div>
                            <div className="col-4 d-flex justify-content-end">
                                {/* <AddPost userName={userData.name} />
                                <EditMyProfile /> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between">
                            {/* <p className={style.profile__count}><span>{userData.post_count|| 0}</span>Posts</p> */}
                            {/* <NavLink to='/friends' className={style.profile__count}><span>{userData.friends_count || 0}</span>Friends</NavLink>
                            <NavLink to='/followers' className={style.profile__count}><span>{userData.subscribers_count || 0}</span>Followers</NavLink> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={style.profile__count__container}>
                        <div className="row">
                            {/* <div className="col-3">
                                <p className={style.profile__count}><LocationOnOutlined />{userData.located}</p>
                            </div>
                            <div className="col-3">
                                <p className={style.profile__count}><CalendarMonthOutlined />{userData.birth_date}</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={style.profile__description}>
                        {/* <p>{userData.bio}</p> */}
                    </div>
                </div>
            </div>
            {/* <Divider className={style.divider} /> */}
        </div>
          {/* <MyProfileTop userData={myProfile} />
          <MyProfileDesc userData={myProfile} myProfile={myProfile} /> */}
        </div>
        : null
      }
    </Container>
  );
}


export default GroupPage;

        