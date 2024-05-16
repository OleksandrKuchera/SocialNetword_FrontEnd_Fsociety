import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from '../MyProfile/style.module.scss';
import UserProfileTop from "./UserProfileTop.tsx/UserProfileTop";
import MyProfileDesc from "../MyProfile/MyProfileDesc/MyProfileDesc";
import { CircularProgress, Container } from "@mui/material";
import { MyProfileContext } from "../HomeLayout/HomeLayout";
import { postOrReelsType } from "../MyProfile/MyProfile";

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
  email: string,
}

const UserProfile = () => {
  const { userName } = useParams();
  const myProfile = useContext(MyProfileContext);
  const [userData, setUserData] = useState<userDataType | null>(null);
  const [postOrReels, setPostOrReels] = useState<postOrReelsType>('post');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://socialnetword-fsociety.onrender.com/friend/profile/${userName}`);
        setUserData(response.data.user_info);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userName]);


  return (
    <Container>

      {userData ? (
        <div className={style.profile__container}>
          <UserProfileTop userData={userData} setPostOrReels={setPostOrReels} postOrReels={postOrReels}/>
          {myProfile ? <MyProfileDesc myProfile={myProfile} userData={userData} postOrReels={postOrReels} /> : null}
        </div>
      ) :
        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress color="success" />
        </div>
      }

    </Container>
  );
}

export default UserProfile;
