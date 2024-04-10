import { useEffect, useState } from 'react';
import avatar from '../../../../assets/avatar.png'
import DropMenu from '../../../__ui/DropMenu/DropMenu';
import InputChat from '../InputChat/InputChat';
import style from './chat.module.scss'
import ChatList from '../ChatList/ChatList';

interface Message {
  sender: number;
  receiver: number;
  content: string;
  timestamp: string;
}

const Chat = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const receiverId = ''; // TODO: Замініть це на відповідний ID користувача

  useEffect(() => {
    const websocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/');

    websocket.onopen = () => {
      console.log('З єднано з вебсокетом');
      fetch(`http://127.0.0.1:8000/get_chat_history/${receiverId}/`)
        .then(response => response.json())
        .then(data => {
          const history = data.history.map((msg : Message) => `${msg.sender}: ${msg.content}`);
          setMessages(history);
        });
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'chat_message') {
        const message = `${data.sender}: ${data.content}`; // Перетворення даних у рядок
        setMessages(prevMessages => [...prevMessages, message]);
      } else if (data.action === 'chat_history') {
        const history = data.history.map((msg: Message) => `${msg.sender}: ${msg.content}`);
        setMessages(history);
      }
    };
    
    websocket.onerror = (error) => {
      console.log('Помилка вебсокета: ', error);
    };

    websocket.onclose = (event) => {
      console.log('Вебсокет закрито: ', event);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (ws) {
      const messageObject = {
        action: 'create_chat',
        receiver: receiverId, // ID отримувача
        content: message,
      };
      ws.send(JSON.stringify(messageObject));
      setMessages(prevMessages => [...prevMessages, message]);
    }
  };
  

  return (
    <div className='d-flex justify-content-between'>
      <div className={style.chat__layout}>
        <div className={style.chat__container}>
          <div className={style.chat__top__container}>
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <div className={style.avatar}>
                  <img src={avatar} alt="avatar" />
                  <span></span>
                </div>
                <div className={style.avatar__info}>
                  <h3>Mom</h3>
                  <p>Online</p>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end">
                <DropMenu />
              </div>
            </div>
          </div>
          <div className={style.messages__container}>
            {messages.map((message, index) => (
              <div key={index} className="row d-flex justify-content-start">
                <div className="col-5">
                  <p className={style.message__received}>{message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="input__message">
            <InputChat onEnter={sendMessage} />
          </div>
        </div>
      </div>
      <div className='col-3'>
        <ChatList />
      </div>
    </div>
  );
}

export default Chat
