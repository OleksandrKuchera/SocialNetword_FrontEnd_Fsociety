import { useEffect, useState } from 'react';
import ChatItem from '../ChatItem/ChatItem';
import style from './chatList.module.scss';
import { Message, User } from '../Chat/Chat';

interface ChatListProps {
    chatList: Message[]; // Визначте тип пропсу chatList
    myName: string;
    onUserClick: (user: User, id: number) => void;
}

const ChatList = ({ chatList, onUserClick, myName }: ChatListProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleSetActive = (index: number) => {
        setActiveIndex(index); // Встановлюємо індекс активної картки
    };

    // Викликаємо onUserClick для першого користувача у списку
    useEffect(() => {
        if (chatList.length > 0) {
            const firstUser = chatList[0].receiver.name === myName ? chatList[0].sender : chatList[0].receiver;
            onUserClick(firstUser, chatList[0].id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatList,myName]);

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
                            onUserClick(userItem.receiver.name === myName ? userItem.sender : userItem.receiver, userItem.id);
                        }}
                        user={userItem.receiver.name === myName ? userItem.sender : userItem.receiver}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
