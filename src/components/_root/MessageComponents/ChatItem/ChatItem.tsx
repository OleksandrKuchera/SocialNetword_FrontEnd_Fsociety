import { User } from '../Chat/Chat';
import style from '../ChatList/chatList.module.scss'

type chatItemType = {
    isActive?: boolean,
   onClick: () => void,
   user: User,
}

const ChatItem = ({isActive, onClick, user, } : chatItemType) => {


    return (
        <div  className={isActive? `${style.active} ${style.chat__item}}` : `${style.chat__item}`} onClick={onClick}>
            <div className="d-flex justify-content-between">
                <div>
                    <div className={style.avatar__info}>
                        <img src={user.avatar} alt="avatar" />
                        <div>
                            <h4>{user.name}</h4>
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <p className={style.chat__message}>{user.bio}</p>
                </div>
            </div>
        </div>
    );
}

export default ChatItem;