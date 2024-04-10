import { Container } from 'react-bootstrap';
import MyProfileTop from './MyProfileTop/MyProfileTop';
import style from '../MyProfile/style.module.scss';
import MyProfileDesc from './MyProfileDesc/MyProfileDesc';
import { useEffect, useState } from 'react';
import axios from 'axios';

type userDataType = {
  name: string,
  postCount: number,
  friendsCount: number,
  followersCount:number,
  located: string,
  birth_date: string,
  bio: string,
  avatar: string,
  isFollow : boolean,
  friends_count: number,
  subscribers_count: number,
}

function MyProfile() {
  const [userData, setUserData] = useState<userDataType>({
    name: '',
    postCount: 0,
    friendsCount: 0,
    followersCount:0,
    located: '',
    birth_date: '',
    bio: '',
    avatar: '',
    isFollow : false,
    friends_count:0,
    subscribers_count:0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            const response = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
            
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
        <MyProfileTop userData={userData} />
        <MyProfileDesc userData={userData}/>
      </div>
    </Container>
  );
}

export default MyProfile;
