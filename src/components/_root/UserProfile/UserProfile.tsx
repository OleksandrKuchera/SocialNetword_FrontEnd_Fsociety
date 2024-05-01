import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from '../MyProfile/style.module.scss';
import UserProfileTop from "./UserProfileTop.tsx/UserProfileTop";
import MyProfileDesc from "../MyProfile/MyProfileDesc/MyProfileDesc";
import { CircularProgress, Container } from "@mui/material";

export type userDataType = {
  name: string,
  post_count: number,
  located: string,
  birth_date: string,
  bio: string,
  avatar: string,
  isFollow: boolean,
  friends_count: number,
  subscribers_count: number,
}

const UserProfile = () => {
  const { userName } = useParams();
  const [userData, setUserData] = useState<userDataType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://socialnetword-fsociety.onrender.com/friend/profile/${userName}`);
        setUserData(response.data.user_info);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userName]);

  useEffect(() => {

  }, [])


  return (
    <Container>

      {userData ? (
        <div className={style.profile__container}>
          <UserProfileTop userData={userData} />
          <MyProfileDesc userData={userData} />
        </div>
      ) :
        <div style={{width:'100%',height:'100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>
          <CircularProgress color="success" />
        </div>
      }

    </Container>
  );
}

export default UserProfile;
