import { Container } from 'react-bootstrap';
import MyProfileTop from './MyProfileTop/MyProfileTop';
import style from './style.module.scss';
import MyProfileDesc from './MyProfileDesc/MyProfileDesc';



function UserProfile() {
  return (
    <Container>
      <div className={style.profile__container}>
        <MyProfileTop />
        <MyProfileDesc/>
      </div>
    </Container>
  );
}

export default UserProfile;