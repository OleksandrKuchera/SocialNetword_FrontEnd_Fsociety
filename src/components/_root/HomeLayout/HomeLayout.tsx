import { createContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import './homeLayout.scss'
import { Outlet } from "react-router-dom";
import axios from "axios";

export type userDataType = {
    name: string,
    located: string,
    birth_date: string,
    bio: string,
    avatar: string,
    isFollow: boolean,
    friends_count: number,
    subscribers_count: number,
    post_count: number
    email: string
}
export const MyProfileContext = createContext<userDataType | undefined>(undefined);


const HomeLayout = () => {
    const [myProfile, setMyProfile] = useState<userDataType>({
        name: '',
        post_count: 0,
        located: '',
        birth_date: '',
        bio: '',
        avatar: '',
        isFollow: false,
        friends_count: 0,
        subscribers_count: 0,
        email: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
                const response = await axios.get(`https://socialnetword-fsociety.onrender.com/api/mypage/${accessToken}`);
                setMyProfile(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container-fluid home__layout">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 p-0">
                    <div className="background__central">
                        <MyProfileContext.Provider value={myProfile}>
                            <Outlet />
                        </MyProfileContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLayout;