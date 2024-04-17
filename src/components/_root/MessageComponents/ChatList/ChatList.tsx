import { useState } from 'react';
import ChatItem from '../ChatItem/ChatItem';
import style from './chatList.module.scss';
import { useNavigate } from 'react-router-dom';
import { Message } from '../Chat/Chat';

interface ChatListProps {
    chatList: Message[]; // Визначте тип пропсу chatList
}

const ChatList = ({chatList} : ChatListProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const navigate = useNavigate();

    const handleSetActive = (index: number) => {
        setActiveIndex(index); // Встановлюємо індекс активної картки
        navigate(`/message/${name}`);
    };

    return (
        <div className={style.chat__container}>
            <h2 className={style.chat__title}>Chats</h2>
            <div className={style.chat__list}>
                {chatList.map((userItem, index) => (
                    <ChatItem
                        key={index}
                        isActive={index === activeIndex} // Перевіряємо, чи поточний індекс співпадає з активним
                        onClick={() => handleSetActive(index)} // Передаємо функцію для зміни стану активності
                        user = {userItem.receiver}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
