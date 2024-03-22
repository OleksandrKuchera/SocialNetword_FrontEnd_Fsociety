import { Container } from 'react-bootstrap';
import MyProfileTop from './MyProfileTop/MyProfileTop';
import style from './style.module.scss';



function UserProfile() {

  // Повертаємо розмітку компонента
  return (
    <Container>
      <div className={style.profile__container}>
        <MyProfileTop />
      </div>
    </Container>
  );
}

export default UserProfile;