import React, { ChangeEvent, Fragment, useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Dialog } from '@mui/material';
import './style.scss';
import axios from 'axios';

interface Profile {
    profileImg: File | null;
    name: string;
    bio: string;
    located: string;
    birth_date: string;
}

const EditMyProfile: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<Profile>({
        name: '',
        bio: '',
        located: '',
        birth_date: '',
        profileImg: null,
    });
    const [isEditingName, setIsEditingName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>(''); // Додайте стан для повідомлення про помилку

    useEffect(() => {
        const fetchProfileData = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            try {
                const response = await axios.patch(`http://127.0.0.1:8000/api/update-profile/${accessToken}/`, {
                });
                const profileData: Profile = response.data;
                setProfile(profileData);
            } catch (error) {
                setErrorMessage('Error fetching profile data.'); // Встановлюємо повідомлення про помилку
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfile({
            ...profile,
            profileImg: e.target.files ? e.target.files[0] : null,
        });
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                setAvatar(imageDataUrl);
            };
            reader.readAsDataURL(file); // Читаємо файл як URL або base64
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('bio', profile.bio);
            formData.append('located', profile.located);
            formData.append('birth_date', profile.birth_date);

            if (profile.profileImg) {
                formData.append('avatar', profile.profileImg); // Ensure the key matches your backend expectation (e.g., 'profileImg')
            }

            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }

            await axios.patch(
                `http://127.0.0.1:8000/api/update-profile/${accessToken}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setIsLoading(false);
            handleClose();
            window.location.reload();
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.error || error.response?.data.bio)
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmitName = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditingName(!isEditingName);
    };

    return (
        <Fragment>
            <button className='edit__profile__btn' onClick={handleClickOpen}>
                Edit Profile
            </button>
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
                    <form className='edit__profile__form'>
                        {errorMessage &&
                            <Alert style={{color: 'orange'}} className='mb-3' variant="outlined" severity="warning">
                                {errorMessage}
                            </Alert>
                        }
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    Name:
                                    {isEditingName ?
                                        <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
                                        :
                                        <h2>{profile.name}</h2>
                                    }
                                </label>
                                <button className='edit__profile__btn' onClick={(e) => handleSubmitName(e)}>
                                    {isEditingName ?
                                        'Save name' : 'Change name'
                                    }
                                </button>
                            </div>
                            <div className="col-6">
                                <label>
                                    Bio:
                                    <textarea name="bio" value={profile.bio} onChange={handleTextareaChange} />
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    Country:
                                    <input required maxLength={22} type="text" name="located" value={profile.located} onChange={handleInputChange} />                                </label>
                            </div>
                            <div className="col-6">
                                <label>
                                    Date:
                                    <input required type="date" min="1900-01-01" max="2040-12-31" name="birth_date" value={profile.birth_date} onChange={handleInputChange} />                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button className='edit__profile__btn' variant="contained" color="primary" component="span">
                                        Upload photo
                                    </Button>
                                </label>
                            </div>
                        </div>
                        {avatar.length > 0 ?
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <img className='upload__img' src={avatar} alt="" />
                                </div>
                            </div>
                            : null
                        }

                    </form>
                </DialogContent>
                <DialogActions>
                    <button className='edit__profile__btn' type="submit" onClick={handleSubmit}>
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default EditMyProfile;
