import { useContext, useEffect, useState } from 'react';
import ChatCloud from '../ChatCloud/ChatCloud';
import ChatList from '../ChatList/ChatList';
import axios from 'axios';
import { Option } from '../../../__ui/DropMenu/DropMenu';
import { MyProfileContext } from '../../HomeLayout/HomeLayout';

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
  const myProfile = useContext(MyProfileContext);
  const [userChatList, setUserChatList] = useState<Message[] | []>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<number>(0);


  useEffect(() => {
    const getChatRooms = async() => {  
      if(myProfile) {
        try {
          const response = await axios.get(`https://socialnetword-fsociety.onrender.com/chat/user_chat_rooms/${myProfile.name}`);
          setUserChatList(response.data);
          if (response.data.length > 0) {
            setActiveUser(response.data[0].receiver); // Встановлюємо першого користувача в списку як активного
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    getChatRooms();

  }, [myProfile]);

  const handleUserClick = (user: User, roomId: number) => {
    setActiveUser(user);
    setRoomId(roomId)
  };

  const deleteChat = async () => {
    try {
      const formData = new FormData();
      formData.append('room_id', roomId.toString());
      await axios.post('https://socialnetword-fsociety.onrender.com/chat/delete_chat/', formData)
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
  const menuOptions: Option = {
    label: 'Delete chat',
    onClick: deleteChat,
  }
  const menuOptionsArray: Option[] = [];
  menuOptionsArray.push(menuOptions);

  return (
    <div className='d-flex justify-content-between'>
      {activeUser && myProfile ? <ChatCloud myProfile={myProfile} menuOptionsArray={menuOptionsArray} activUser={activeUser} roomId={roomId} /> : null}
      <div className='col-3'>
        {myProfile? <ChatList myName={myProfile.name } chatList={userChatList} onUserClick={handleUserClick} /> : null}

      </div>
    </div>
  );
}

export default Chat
