import { Delete, Message } from '@mui/icons-material';
import avatar from '../../../assets/avatar.png'
import style from './style.module.scss';

const FriendItem = () => {

    const handdleClickMessage = () => {
    }
    const handdleClickDelete = () => {     
    }
    
    return (
        <div className="col-12">
            <div className={style.friend__item__container}>
                <div className={style.friend__info}>
                    <img src={avatar} alt="avatar" />
                    <h3>Jordfio Pisiuneri</h3>
                </div>
                <div className={style.friend__btn}>
                    <button onClick={handdleClickMessage}><Message/></button>
                    <button onClick={handdleClickDelete}><Delete/></button>
                </div>
            </div>
        </div >
     );
}

export default FriendItem;