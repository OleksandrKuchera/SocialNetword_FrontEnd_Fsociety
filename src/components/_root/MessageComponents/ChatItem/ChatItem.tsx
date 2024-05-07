import { shortenText } from '../../functions/shortText';
import { User } from '../Chat/Chat';
import style from '../ChatList/chatList.module.scss'


type chatItemType = {
    isActive?: boolean,
    onClick: () => void,
    user: User,
}

const ChatItem = ({ isActive, onClick, user, }: chatItemType) => {

    return (
        <div className={isActive ? `${style.active} ${style.chat__item}}` : `${style.chat__item}`} onClick={onClick}>
            <div className={style.avatar__info}>
                <div className="row d-flex align-items-center">
                    <div className="col-7">
                        <div className="row d-flex align-items-center">
                            <div className="col-6">
                                <img src={user.avatar.slice(13)} alt="avatar" />
                            </div>
                            <div className="col-6">
                                <h4>{user.name}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        {user.bio.trim().length > 0 ? <p className={style.chat__message}>{shortenText(user.bio, 18)}</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatItem;