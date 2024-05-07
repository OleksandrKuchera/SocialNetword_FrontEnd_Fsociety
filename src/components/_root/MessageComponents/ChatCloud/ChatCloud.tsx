import { useEffect, useRef, useState } from 'react';
import { User } from '../Chat/Chat';
import InputChat from '../InputChat/InputChat';
import style from './chat.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DropMenu, { Option } from '../../../__ui/DropMenu/DropMenu';
import { userDataType } from '../../HomeLayout/HomeLayout';

type ChatCloudProps = {
    activUser: User,
    roomId: number,
    menuOptionsArray: Option[],
    myProfile: userDataType,
};
export type ChatMessage = {
    id: number;
    room: number;
    sender: User;
    text: string;
    timestamp: string;
    read: boolean;
};
export type ChatNewMessage = {
    messages: ChatMessage[],
};
type OptionKeys = 'time' | 'date';

const ChatCloud = ({ menuOptionsArray, activUser, roomId, myProfile }: ChatCloudProps) => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const navigate = useNavigate();
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    function formatDateTime(dateTimeString: string, options: string): string {
        const date = new Date(dateTimeString);

        const time = `${formatTwoDigits(date.getHours())}:${formatTwoDigits(date.getMinutes())}`;

        const day = formatTwoDigits(date.getDate());
        const month = formatTwoDigits(date.getMonth() + 1);
        const year = date.getFullYear();

        const selectOptions: Record<OptionKeys, string> = {
            'time': `${time}`,
            'date': `${day}.${month}.${year}`,
        }

        return selectOptions[options as OptionKeys];
    }

    function formatTwoDigits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const getChat = async () => {
        try {
            const getHistoryChat = await axios.get(`https://socialnetword-fsociety.onrender.com/chat/get_chat_history/${roomId}`);
            setChatHistory(getHistoryChat.data);
            setTimeout(scrollToBottom, 1000)
        } catch (e) {
            console.log(e);
        }
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [chatHistory]);

    useEffect(() => {
        getChat();

        const CheckNewMessage = async () => {
            try {
                const responseNewMessage = await axios.get<ChatNewMessage>(`https://socialnetword-fsociety.onrender.com/chat/check_new_messages/${myProfile.name}`);
                responseNewMessage.data.messages.forEach((message) => {
                    setChatHistory(prevChatHistory => [...prevChatHistory, message]);
                })
            } catch (error) {
                console.error('Error fetching chat data:', error);
            }
        };

        const intervalId = setInterval(CheckNewMessage, 3000);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activUser.name, roomId])

    const sendMessage = async (text: string) => {
        const formData = new FormData();
        formData.append('room_id', roomId.toString());
        myProfile ? formData.append('sender_name', myProfile.name) : null;
        formData.append('text', text);
        await axios.post(`https://socialnetword-fsociety.onrender.com/chat/create_message/`, formData);
        getChat();
    }

    const userToProfile = () => {
        navigate(`/profile/${activUser.name}`)
    }

    return (
        <div className={style.chat__layout}>
            <div className={style.chat__container}>
                <div className={style.chat__top__container}>
                    <div className="row">
                        <div className="col-6">
                            <div onClick={userToProfile} className={style.user__chat}>
                                <div className={style.avatar}>
                                    <img src={activUser.avatar.slice(13)} alt="avatar" />
                                </div>
                                <div className={style.avatar__info}>
                                    <h3>{activUser.name}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <DropMenu options={menuOptionsArray} />
                        </div>
                    </div>
                </div>
                <div className={style.messages__container}>

                    {myProfile ?
                        chatHistory.map((message, index) => {
                            return (
                                <>
                                    {index === 0 || formatDate(message.timestamp) !== formatDate(chatHistory[index - 1].timestamp) ? (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className={style.date__separator__container}>
                                                    <hr />
                                                    <p className={style.date__separator}>
                                                        {formatDate(message.timestamp)}
                                                    </p>
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>

                                    ) : null}

                                    {message.sender.name != myProfile.name ? (
                                        <div key={index} className="row d-flex justify-content-start">
                                            <div className="col-12 d-flex align-items-center">
                                                <div className={style.message__received}>
                                                    {message.text.split('</br>').map((line, idx) => (
                                                        <div key={idx}>
                                                            {line}
                                                            {idx !== message.text.split('\n').length - 1 && <br />}
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className={style.message__staptime}>{formatDateTime(message.timestamp, 'time')}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index} className="row d-flex justify-content-end">
                                            <div className="col-12 d-flex justify-content-end align-items-center">
                                                <span className={style.message__staptime}>{formatDateTime(message.timestamp, 'time')}</span>
                                                <div className={style.message__sender}>
                                                    {message.text.split('</br>').map((line, idx) => (
                                                        <div key={idx}>
                                                            {line}
                                                            {idx !== message.text.split('\n').length - 1 && <br />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        }) : null
                    }

                    <div ref={messagesEndRef} />
                </div>
                <div className="input__message">
                    <InputChat onEnter={sendMessage} placeholder='Type a message' />
                </div>
            </div>
        </div>
    );
}

export default ChatCloud;