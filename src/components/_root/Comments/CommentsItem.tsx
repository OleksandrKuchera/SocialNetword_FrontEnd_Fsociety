import { useNavigate } from "react-router-dom";
import style from './comments.module.scss'
import { shortenText } from "../functions/shortText";
import { Author } from "../Home/Home";

type CommentsItemProps = {
    autor: Author,
    text: string,
}

const CommentsItem = ({ autor, text }: CommentsItemProps) => {
    const navigate = useNavigate();

    const handleClickCard = (userName: string) => {
        navigate(`/profile/${userName}`);
    };

    return (
        <div className="row">
            <div className="col-12">
                <div onClick={() => handleClickCard(autor.name)} className={style.recomendation__item}>
                    <div className="row">
                        <div className="col-3">
                            <div className='d-flex align-items-center'>
                                <img src={autor.avatar.slice(13)} alt="avatar" />
                                <h3>{shortenText(autor.name, 11)}</h3>
                            </div>
                        </div>
                        <div className="col-9 d-flex align-items-center">
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentsItem;