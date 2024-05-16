import { Container } from 'react-bootstrap';
import MyProfileTop from './MyProfileTop/MyProfileTop';
import style from '../MyProfile/style.module.scss';
import MyProfileDesc from './MyProfileDesc/MyProfileDesc';
import { MyProfileContext } from '../HomeLayout/HomeLayout';
import { useContext, useState } from 'react';

export type postOrReelsType = 'post' | 'reels';

function MyProfile() {
  const myProfile = useContext(MyProfileContext);
  const [postOrReels, setPostOrReels] = useState<postOrReelsType>('post');


  return (
    <Container>
      {myProfile ?
        <div className={style.profile__container}>
          <MyProfileTop userData={myProfile} postOrReels={postOrReels} setPostOrReels={setPostOrReels}/>
          <MyProfileDesc userData={myProfile} myProfile={myProfile} postOrReels={postOrReels}/>
        </div>
        : null
      }
    </Container>
  );
}

export default MyProfile;
