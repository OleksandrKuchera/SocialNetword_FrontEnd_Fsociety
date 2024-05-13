import { Container } from 'react-bootstrap';
import MyProfileTop from './MyProfileTop/MyProfileTop';
import style from '../MyProfile/style.module.scss';
import MyProfileDesc from './MyProfileDesc/MyProfileDesc';
import { MyProfileContext } from '../HomeLayout/HomeLayout';
import { useContext } from 'react';


function GroupPage() {
  const myProfile = useContext(MyProfileContext);


  return (
    <Container>
      {myProfile ?
        <div className={style.profile__container}>
          <MyProfileTop userData={myProfile} />
          <MyProfileDesc userData={myProfile} myProfile={myProfile} />
        </div>
        : null
      }
    </Container>
  );
}

export default GroupPage;
