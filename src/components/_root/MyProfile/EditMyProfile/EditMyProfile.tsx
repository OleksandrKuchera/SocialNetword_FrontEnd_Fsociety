import { ChangeEvent, Fragment, useState } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog } from '@mui/material';
import './style.scss';
import avatar from '../../../../assets/avatar.png';
import axios from 'axios';

interface Profile {
    profileImg: File | null,
    name: string;
    bio: string;
    country: string;
    date: string;
}

const EditMyProfile = () => {
    const [open, setOpen] = useState(false);

    const [profile, setProfile] = useState<Profile>({
        name: 'Antonio Chaplin',
        bio: 'Дарова туда сюда мене звати так то люблю то сво хіджу там туда сюда вчуся живу.',
        country: 'Kyiv, Ukraine',
        date: '10.10.98',
        profileImg: null,
    });
    const [isEditingName, setIsEditingName] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://your-backend-url.com', profile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
                    <div className="row">
                        <div className="col-12">
                            <form className='edit__profile__form' onSubmit={handleSubmit}>
                                <div className="change__profile__info">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="row">
                                                <div className="col-6 d-flex align-items-center">
                                                    <img src={avatar} alt="avatar" />
                                                    {isEditingName ?
                                                        <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
                                                        :
                                                        <h2>{profile.name}</h2>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex flex-column align-items-center">
                                            <button className='edit__profile__btn mb-2' onClick={() => setIsEditingName(!isEditingName)}>
                                                {
                                                    isEditingName ?
                                                        'Save name' : 'Change name'
                                                }
                                            </button>
                                            <input
                                                accept="image/*"
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                style={{display: 'none'}}
                                                onChange={handleFileChange}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Button className='edit__profile__btn' variant="contained" color="primary" component="span">
                                                    Upload photo
                                                </Button>
                                            </label>
                                        </div>
                                    </div>
                                    <label>
                                        Bio:
                                        <textarea name="bio" value={profile.bio} onChange={handleTextareaChange} />
                                    </label>
                                    <label>
                                        Country:
                                        <input type="text" name="country" value={profile.country} onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        Date:
                                        <input type="text" name="date" value={profile.date} onChange={handleInputChange} />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className='edit__profile__btn' type="submit">Submit</button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default EditMyProfile;
