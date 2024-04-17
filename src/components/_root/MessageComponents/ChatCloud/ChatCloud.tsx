import avatar from '../../../../assets/avatar.png'
import DropMenu from '../../../__ui/DropMenu/DropMenu';
import InputChat from '../InputChat/InputChat';
import style from './chat.module.scss'

const ChatCloud = () => {
    const sendMessage = () => {

    }

    return (
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

                    <div className="row d-flex justify-content-start">
                        <div className="col-5">
                            <p className={style.message__received}>bmxbcjkajd</p>
                        </div>
                    </div>
                </div>
                <div className="input__message">
                    <InputChat onEnter={sendMessage} />
                </div>
            </div>
        </div>
    );
}

export default ChatCloud;