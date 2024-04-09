import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from '../MyProfile/style.module.scss';
import UserProfileTop from "./UserProfileTop.tsx/UserProfileTop";
import MyProfileDesc from "../MyProfile/MyProfileDesc/MyProfileDesc";
import { Container } from "@mui/material";

export type userDataType = {
  name: string,
  postCount: number,
  friendsCount: number,
  followersCount: number,
  located: string,
  birth_date: string,
  bio: string,
  avatar: string,
  isFollow: boolean,
  friends_count: number,
}

const UserProfile = () => {
  const { userName } = useParams();
  const [userData, setUserData] = useState<userDataType | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/friend/profile/${userName}`);
        setUserData(response.data.user_info);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userName]);

  useEffect(() => {

  },[])

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className={style.profile__container}>
        <UserProfileTop userData={userData}/>
        <MyProfileDesc userData={userData} />
      </div>
    </Container>
  );
}

export default UserProfile;
