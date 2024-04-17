import { useEffect, useState } from 'react';
import ChatCloud from '../ChatCloud/ChatCloud';
import ChatList from '../ChatList/ChatList';
import axios from 'axios';

export type User = {
  email: string;
  name: string;
  avatar: string;
  bio: string;
  birth_date: Date | null;
  located: string;
  is_active: boolean;
  is_staff: boolean;
  is_email_verified: boolean;
  account_token: string;
  friends_count: number;
  subscribers_count: number;
};

export type Message = {
  id: number;
  sender: User;
  receiver: User;
};


const Chat = () => {
  const [senderName, setSenderName] = useState('');
  const [userChatList, setUserChatList] = useState<Message[] | []>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);

        setSenderName(response.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      try {
        const response = await axios.get(`http://127.0.0.1:8000/chat/user_chat_rooms/${senderName}`);
        setUserChatList(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


    fetchUserData();
  }, [senderName]);

  return (
    <div className='d-flex justify-content-between'>
      <ChatCloud />
      <div className='col-3'>
        <ChatList chatList={userChatList}/>
      </div>
    </div>
  );
}

export default Chat
