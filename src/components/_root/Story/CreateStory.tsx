import { ChangeEvent, Fragment, useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Dialog } from '@mui/material';
import style from '../MyProfile/AddPost/style.module.scss';
import './StoryReel.scss';
import { AddRounded } from '@mui/icons-material';
import axios from 'axios';
import { userDataType } from '../HomeLayout/HomeLayout';

type CreateStoryProps = {
    myProfile: userDataType,
}

const CreateStory = ({ myProfile }: CreateStoryProps) => {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [reel, setReel] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReelsFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const MAX_VIDEO_DURATION_SEC = 15;

        if (file) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                if (video.duration > MAX_VIDEO_DURATION_SEC) {
                    setErrorMessage(`Тривалість відео перевищує ${MAX_VIDEO_DURATION_SEC} секунд`);
                    setSelectedFile(null);
                    setReel('');
                } else {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const videoDataUrl = reader.result as string;
                        setReel(videoDataUrl);
                    };
                    reader.readAsDataURL(file);
                    setSelectedFile(file);
                    setErrorMessage('');
                }
            };
            video.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async () => {
        setLoading(true); // Встановіть стан завантаження на true при початку відправки

        const formData = new FormData();
        if (selectedFile) {
            formData.append('video', selectedFile);
        }
        formData.append('author', myProfile.name);

        try {
            if (!selectedFile) {
                setErrorMessage('No upload photo');
                new Error('no photo')
                setLoading(false);
            }
            await axios.post("https://socialnetword-fsociety.onrender.com/stories/stories_create/", formData);
            setLoading(false);
            handleClose();
            window.location.reload();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.errors.description[0]);
            } else {
                setErrorMessage('')
            }
            setLoading(false);
        }
    };

    return (
        <Fragment>
                <div className='createStory'onClick={handleClickOpen}>
                    <img src={myProfile.avatar.slice(13)} alt='profile-pic' />
                    <div className='lower'>
                        <div className='circle'>
                            <AddRounded />
                        </div>
                        <h5>Create Story</h5>
                    </div>
                </div>
            <Dialog
                onClose={handleClose}
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
                <DialogContent>
                    <div className="row">
                        <div className="col-12">
                            <h2 className={style.add__post__title}>Create reels</h2>
                        </div>
                    </div>
                    {errorMessage &&
                        <Alert style={{ color: 'orange' }} className='mb-3' variant="outlined" severity="warning">
                            {errorMessage}
                        </Alert>
                    }
                    <div className="row">
                        <div className="col-12">
                            <div className={style.add__post__container}>
                                <div className="row">
                                    <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                                        <input
                                            accept={'video/mp4'}
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={handleReelsFileChange}
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button className='edit__profile__btn' variant="contained" color="primary" component="span">
                                                Upload story
                                            </Button>
                                        </label>
                                        {reel.length > 0 ?
                                            <div className="row">
                                                <div className="col-12 d-flex justify-content-center">
                                                    <video className={style.upload__img__post} src={reel} controls />
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {loading ?
                        <p className={style.add__post__submit__loading}>Loading...</p>
                        :
                        <button className={style.add__post__submit} type="submit" onClick={handleSubmit}>Create story </button>
                    }
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default CreateStory;