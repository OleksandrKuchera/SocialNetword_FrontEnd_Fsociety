import { Container } from 'react-bootstrap';
import MyProfileTop from './MyProfileTop/MyProfileTop';
import style from '../MyProfile/style.module.scss';
import MyProfileDesc from './MyProfileDesc/MyProfileDesc';



function MyProfile() {
  return (
    <Container>
      <div className={style.profile__container}>
        <MyProfileTop />
        <MyProfileDesc/>
      </div>
    </Container>
  );
}

export default MyProfile;