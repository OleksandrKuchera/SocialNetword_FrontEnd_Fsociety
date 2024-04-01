import { Container } from "react-bootstrap";
import style from '../MyProfile/style.module.scss';
import UserProfileTop from "./UserProfileTop.tsx/UserProfileTop";
import MyProfileDesc from "../MyProfile/MyProfileDesc/MyProfileDesc";

const UserProfile = () => {

    return ( 
        <Container>
        <div className={style.profile__container}>
          <UserProfileTop />
          <MyProfileDesc/>
        </div>
      </Container>
     );
}
 
export default UserProfile;