import { useState } from 'react';
import ChatItem from '../ChatItem/ChatItem';
import style from './chatList.module.scss';
import { Message, User } from '../Chat/Chat';

interface ChatListProps {
    chatList: Message[]; // Визначте тип пропсу chatList
    myName: string
}

const ChatList = ({ chatList, onUserClick, myName }: ChatListProps & { onUserClick: (user: User) => void }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleSetActive = (index: number) => {
        setActiveIndex(index); // Встановлюємо індекс активної картки
    };

    return (
        <div className={style.chat__container}>
            <h2 className={style.chat__title}>Chats</h2>
            <div className={style.chat__list}>
                {chatList.map((userItem, index) => (
                    <ChatItem
                        key={index}
                        isActive={index === activeIndex}
                        onClick={() => {
                            handleSetActive(index);
                            onUserClick(userItem.receiver.name === myName ? userItem.sender : userItem.receiver);
                        }}
                        user={userItem.receiver.name === myName ? userItem.sender : userItem.receiver}
                    />

                ))}
            </div>
        </div>
    );
};

export default ChatList;
