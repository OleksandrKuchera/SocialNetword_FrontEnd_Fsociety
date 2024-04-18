import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './style.scss';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Author } from '../MyProfileDesc/MyProfileDesc';
import axios from 'axios';
import { userDataType } from '../../UserProfile/UserProfile';

type Post = {
    image: string;
    description: string;
    likes: number
};

type MyProfilePostProps = {
    id: number
    post: Post;
    autor: Author,
};

const MyProfilePost = ({ id, post, autor }: MyProfilePostProps) => {
    const [open, setOpen] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [myProfile, setMyProfile] = useState<userDataType>({
        name: '',
        postCount: 0,
        friendsCount: 0,
        followersCount: 0,
        located: '',
        birth_date: '',
        bio: '',
        avatar: '',
        isFollow: false,
        friends_count: 0,
        subscribers_count: 0,
    })

    useEffect(() => {
        setLikeCount(post.likes);
    }, [post.likes])

    const handleClickOpen = () => {
        setOpen(true);
        console.log(id)
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getMyFriendList = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('Access token not found in localStorage');
                    return;
                }

                const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
                setMyProfile(responseUser.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getMyFriendList();
        console.log(myProfile.name, id)
    }, []);

    const addLike = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/posts/like/', {

                post_id: id,
                name: myProfile.name,
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleLike = () => {
        addLike();
        isLike ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
        setIsLike(!isLike);
    };

    return (
        <div className="col-4">
            <React.Fragment>
                <Button className='post__img' variant="outlined" onClick={handleClickOpen}>
                    <img className='post__img__label)' src={post.image} alt="postImgTitle" />
                </Button>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth='md'
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div className="row">
                            <div className="col-6">
                                <img className='open__post__img' src={post.image} alt="postImgTitle" />
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-between">
                                <div className="profile__container">
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={autor.avatar} alt="avatar" />
                                        </div>
                                        <div className="col-9">
                                            <h2>{autor.name}</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className='post__description'>{post.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 d-flex align-items-center">
                                        <button className='post__like' onClick={handleLike}>{!isLike ? <FavoriteBorder /> : <Favorite style={{ color: 'red' }} />}</button>
                                        <p style={{ color: 'white' }}>{likeCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default MyProfilePost;
