import FriendItem from './FriendItem';
import PeopleItem from './PeopleItem';
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

const FrendList = () => {

    const [userList, setUserList] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { type } = useParams<{ type: string }>();

    useEffect(() => {
        console.log(type)
        let url = '';
        switch (type) {
            case 'friends'://за ким ти стежиш
                url = `http://127.0.0.1:8000/friend/all/`;
                break;
            case 'followers'://хто за тобою стжить
                url = `http://127.0.0.1:8000/followers/search/`;
                break;
            case 'society': // всі друзі які існують в системі
                url = `http://127.0.0.1:8000/society/search/`;
                break;
            default:
                url = `http://127.0.0.1:8000/society/search/`;
                break;
        }
        const fetchUserData = async () => {
            try {
                if (searchQuery.length == 0) {
                    url += searchQuery;
                } else {
                    url += 'null';
                }
                const response = await axios.get(url);
                setUserList(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [searchQuery, type]);

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
                        type === 'friends' ? <FriendItem key={user.name} user={user} /> : 
                        user.isFollow ? <FriendItem key={user.name} user={user} /> : <PeopleItem key={user.name} user={user} /> 
                    )
                    )}
                </div>
            </div>
        </div >
    );
}

export default FrendList;