import { useEffect, useState } from 'react';
import DropMenu from '../../../__ui/DropMenu/DropMenu';
import { User } from '../Chat/Chat';
import InputChat from '../InputChat/InputChat';
import style from './chat.module.scss'
import axios from 'axios';

type ChatCloudProps = {
    activUser: User,
    roomId: number,
}

type ChatMessage = {
    id: number;
    room: number;
    sender: User;
    text: string;
    timestamp: string;
    read: boolean;
};

const ChatCloud = ({ activUser, roomId }: ChatCloudProps) => {
    const [newMessage, setNewMessage] = useState<ChatMessage[]>([]);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/chat/check_new_messages/${activUser.name}`);
                setNewMessage(response.data);
                console.log('Отримана інформація:', response.data);

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();


    }, [activUser.name])

    const sendMessage = () => {

    }

    return (
        <div className={style.chat__layout}>
            <div className={style.chat__container}>
                <div className={style.chat__top__container}>
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <div className={style.avatar.slice(13)}>
                                <img src={activUser.avatar} alt="avatar" />
                                <span></span>
                            </div>
                            <div className={style.avatar__info}>
                                <h3>{activUser.name}</h3>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <DropMenu />
                        </div>
                    </div>
                </div>
                <div className={style.messages__container}>
                    {newMessage.map((message, index) => (
                        <div key={index} className="row d-flex justify-content-start">
                            <div className="col-5">
                                <p className={style.message__received}>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="input__message">
                    <InputChat onEnter={sendMessage} />
                </div>
            </div>
        </div>
    );
}

export default ChatCloud;