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

type Post = {
    image: string;
    description: string;
    likes: number,
    isLiked: boolean,

};

type MyProfilePostProps = {
    id: number
    post: Post;
    autor: Author,
};

const MyProfilePost = ({ id, post, autor }: MyProfilePostProps) => {
    const [open, setOpen] = useState(false);
    const [isLike, setIsLike] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState<number>(0);
    console.log(isLike);

    useEffect(() => {
        setLikeCount(post.likes);
    }, [post.likes])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addLike = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
            const formData = new FormData();
            formData.append('name_user', responseUser.data.name);
            formData.append('post_id', id.toString());
            await axios.post('http://127.0.0.1:8000/posts/like/', formData);
        } catch (e) {
            console.log(e);
        }
    }
    const removeLike = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            const responseUser = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);
            const formData = new FormData();
            formData.append('name_user', responseUser.data.name);
            formData.append('post_id', id.toString());
            await axios.post('http://127.0.0.1:8000/posts/unlike/', formData);
        } catch (e) {
            console.log(e);
        }
    }

    const handleLike = () => {
        isLike ? removeLike() : addLike();
        isLike ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
        setIsLike(!isLike);
    };

    return (
        <div className="col-4 d-flex justify-content-center">
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
                            <div className="col-6 d-flex justify-content-center">
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
