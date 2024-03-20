import avatar from '../../../../assets/avatar.png'
import DropMenu from '../../../__ui/DropMenu/DropMenu';
import InputChat from '../InputChat/InputChat';
import style from './chat.module.scss'
import ChatList from '../ChatList/ChatList';

const Chat = () => {
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

                <div className="row d-flex justify-content-end">
                  <div className="col-5 d-flex justify-content-end">
                    <p className={style.message__sender}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, commodi, sed amet minus numquam, quis tempora beatae natus incidunt autem accusamus deleniti eos veniam nobis. Esse minus assumenda mollitia itaque.</p>
                  </div>
                </div>
                <div className="row d-flex justify-content-start">
                  <div className="col-5">
                    <p className={style.message__received}>Hi bich!</p>
                  </div>
                </div>
                <div className="row d-flex justify-content-end">
                  <div className="col-5 d-flex justify-content-end">
                    <p className={style.message__sender}>Hi mom!</p>
                  </div>
                </div>
              </div>
              <div className="input__message">
                <InputChat />
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
