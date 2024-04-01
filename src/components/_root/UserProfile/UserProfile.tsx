import { Container } from "react-bootstrap";
import style from '../MyProfile/style.module.scss';
import UserProfileTop from "./UserProfileTop.tsx/UserProfileTop";
import MyProfileDesc from "../MyProfile/MyProfileDesc/MyProfileDesc";
import { useEffect, useState } from "react";
import axios from "axios";

type userDataType = {
  name: string,
  postCount: number,
  friendsCount: number,
  followersCount:number,
  located: string,
  birth_date: string,
  bio: string,
  avatar: string,
}
 

const UserProfile = () => {
  const [userData, setUserData] = useState<userDataType>({
    name: '',
    postCount: 0,
    friendsCount: 0,
    followersCount:0,
    located: '',
    birth_date: '',
    bio: '',
    avatar: '',
});

  useEffect(() => {

    const fetchUserData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            const response = await axios.get(`http://127.0.0.1:8000/api/profile/${accessToken}`);
            
            setUserData(response.data);
            console.log('Отримана інформація:', response.data);
            
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
}, []);

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