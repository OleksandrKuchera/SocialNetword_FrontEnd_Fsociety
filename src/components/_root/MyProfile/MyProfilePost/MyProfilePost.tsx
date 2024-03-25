import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import postImgTitle from '../../../../assets/2ae124d20589cf2442a17ae918acaf3a.png'
import avatar from '../../../../assets/avatar.png'
import './style.scss';
import { Favorite, FavoriteBorder} from '@mui/icons-material';


const MyProfilePost = () => {
    const [open, setOpen] = useState(false);
    const [islike, setIsLike] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLike = () => {
        setIsLike(!islike)
    }
    return (
        <div className="col-4">
            <React.Fragment>
                <Button className='post__img' variant="outlined" onClick={handleClickOpen}>
                    <img src={postImgTitle} alt="postImgTitle" />
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
                                <img className='open__post__img' src={postImgTitle} alt="postImgTitle" />
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-between">
                                <div className="profile__container">
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={avatar} alt="avatar" />
                                        </div>
                                        <div className="col-9">
                                            <h2>Antodio Banderolka</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-12">
                                        <p className='post__description'>There are so many beautiful squirrels in the park</p>
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <button className='post__like' onClick={handleLike}>{!islike ? <FavoriteBorder/> : <Favorite style={{color: 'red'}}/>}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </div>
    );
}

export default MyProfilePost;