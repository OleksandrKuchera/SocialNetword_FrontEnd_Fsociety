import React, { ChangeEvent, Fragment, useState, useEffect } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog } from '@mui/material';
import './style.scss';
import axios from 'axios';

interface Profile {
    profileImg: File | null;
    name: string;
    bio: string;
    country: string;
    date: string;
}

const EditMyProfile: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState<Profile>({
        name: '',
        bio: '',
        country: '',
        date: '',
        profileImg: null,
    });
    const [isEditingName, setIsEditingName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


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
                console.error(error);
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
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('Access token not found in localStorage');
                return;
            }
            formData.append('name', profile.name);
            formData.append('bio', profile.bio);
            formData.append('country', profile.country);
            formData.append('date', profile.date);
            if (profile.profileImg) {
                formData.append('profileImg', profile.profileImg);
            }

            await axios.patch(`http://127.0.0.1:8000/api/update-profile/${accessToken}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            handleClose();
            window.location.reload();
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
                                    <input maxLength={35} type="text" name="country" value={profile.country || ''} onChange={handleInputChange} />
                                </label>
                            </div>
                            <div className="col-6">
                                <label>
                                    Date:
                                    <input type="date" min="1900-01-01" max="2040-12-31" name="date" value={profile.date} onChange={handleInputChange} />
                                </label>
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