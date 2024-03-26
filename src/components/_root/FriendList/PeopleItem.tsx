import avatar from '../../../assets/avatar.png'
import style from './style.module.scss';

const FriendItem = () => {

    const handdleFollowing = () => {
    }
    
    return (
        <div className="col-12">
            <div className={style.friend__item__container}>
                <div className={style.friend__info}>
                    <img src={avatar} alt="avatar" />
                    <h3>Jordfio Pisiuneri</h3>
                </div>
                <div className={style.friend__btn}>
                    <button className={style.friend__btn__folow} onClick={handdleFollowing}>Folowwing</button>
                </div>
            </div>
        </div >
     );
}

export default FriendItem;