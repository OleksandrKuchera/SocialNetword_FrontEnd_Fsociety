import FriendItem from './FriendItem';
import style from './style.module.scss';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './themeSeacrchComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PeopleItem from './PeopleItem';

type User = {
    name: string,
    avatar: string,
    isFollow: boolean,
}

const FrendList = () => {

    const [userList, setUserList] = useState<User[]>([]); // Вказуємо тип масиву та об'єктів, які будуть у ньому
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }

                const response = await axios.get(`http://127.0.0.1:8000/api/usersList/${accessToken}`);//тут потрібно з беку дістати масив з користувачами

                setUserList(response.data);
                console.log('Отримана інформація:', response.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div className="container">
            <div className={style.friends__container}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <h2>Society</h2>
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
                    {userList.filter(user => user.name.includes(searchQuery)).map(user => (
                        user.isFollow ? <FriendItem key={user.name} user={user} /> : <PeopleItem key={user.name} user={user} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default FrendList;
