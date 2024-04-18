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
  const [myName, setMyName] = useState<string>('');
  const [userChatList, setUserChatList] = useState<Message[] | []>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<number>(0);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // Отримуємо accessToken з localStorage
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/mypage/${accessToken}`);

        setMyName(response.data.name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      try {
        const response = await axios.get(`http://127.0.0.1:8000/chat/user_chat_rooms/${myName}`);
        setUserChatList(response.data);
        if (response.data.length > 0) {
          setActiveUser(response.data[0].receiver); // Встановлюємо першого користувача в списку як активного
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [myName]);

  const handleUserClick = (user: User, roomId : number) => {
    setActiveUser(user);
    setRoomId(roomId)
  };

  return (
    <div className='d-flex justify-content-between'>
      {activeUser ? <ChatCloud activUser={activeUser} roomId = {roomId}/> : null}
      <div className='col-3'>
       {myName ? <ChatList myName={myName} chatList={userChatList} onUserClick={handleUserClick} /> : null} 

      </div>
    </div>
  );
}

export default Chat
