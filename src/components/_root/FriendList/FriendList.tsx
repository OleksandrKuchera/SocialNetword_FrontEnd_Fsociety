import FriendItem from './FriendItem';
import style from './style.module.scss';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './themeSeacrchComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export type User = {
    name: string,
    avatar: string,
    isFollow: boolean,
}
type userDataType = {
    name: string,
    postCount: number,
    friendsCount: number,
    followersCount:number,
    located: string,
    birth_date: string,
    bio: string,
    avatar: string
    isFollow : boolean
  }

const FrendList = () => {

    const [userList, setUserList] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { type } = useParams<{ type: string }>();
    const {userNameParams} = useParams<{ userNameParams: string }>();
    const [urlName, setUrlName] = useState<string>('');

    const [userData, setUserData] = useState<userDataType>({
        name: '',
        postCount: 0,
        friendsCount: 0,
        followersCount:0,
        located: '',
        birth_date: '',
        bio: '',
        avatar: '',
        isFollow : false
      });

    useEffect(()=>{
        const fetchUserDataNameMainProfile = async () => {
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
    
        fetchUserDataNameMainProfile();
    },[])

    useEffect(() => {
       
        const fetchUserData = async () => {
            try {
  
                if(userNameParams) {
                    setUrlName(userNameParams) ;
                } else {
                    setUrlName(userData.name);
                }
                let url = '';
                switch (type) {
                    case 'friends': 
                        url = `http://127.0.0.1:8000/friend/following/${urlName}`;
                        break;
                    case 'followers':
                        url = `http://127.0.0.1:8000/friend/followers/${urlName}`;
                        break;
                    case 'society':
                        url = `http://127.0.0.1:8000/friend/search/${searchQuery}`
                        break;
                    default:
                        url = 'http://127.0.0.1:8000/friend/all';
                        break;
                }

                const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setUserList(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [searchQuery, type, userData.name, urlName, userNameParams]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div className="container">
            <div className={style.friends__container}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <h2>{type}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Box sx={{ flexGrow: 1 }}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </Search>
                        </Box>
                    </div>
                </div>
                <div className="row">
                    {userList.map(user => (
                       <FriendItem key={user.name} user={user}/>
                    )
                    )}
                </div>
            </div>
        </div >
    );
}

export default FrendList;
