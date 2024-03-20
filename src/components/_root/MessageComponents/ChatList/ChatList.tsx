import ChatItem from '../ChatItem/ChatItem';
import style from './chatList.module.scss'

const ChatList = () => {
    return (
        <div className={style.chat__container}>

            <h2 className={style.chat__title}>Chats</h2>

            <div className={style.chat__list}>
                <ChatItem isActive={false} />
                <ChatItem isActive={true} />
                <ChatItem isActive={false} />
                <ChatItem isActive={false} />
                <ChatItem isActive={false} />
                <ChatItem isActive={false} />
                <ChatItem isActive={false} />
                <ChatItem isActive={false} />
            </div>
        </div>
    );
}

export default ChatList;