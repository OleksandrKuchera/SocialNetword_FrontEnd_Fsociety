import { useNavigate } from "react-router-dom";
import style from './comments.module.scss'
import { shortenText } from "../functions/shortText";
import { Author } from "../Home/Home";
import { TextPreview } from "../functions/showText";
import DropMenu, { Option } from "../../__ui/DropMenu/DropMenu";
import axios from "axios";

type CommentsItemProps = {
    autor: Author,
    text: string,
}

const CommentsItem = ({ autor, text }: CommentsItemProps) => {
    const navigate = useNavigate();

    const deleteComment = async() => {
        try{
            await axios.post('http://127.0.0.1:8000/posts/')
        } catch(e) {
            console.log(e);
        }
    }

    const commentsMenuOptions : Option = {
        label: 'Delete comment',
        onClick: deleteComment,
    }
    const commentsMenuOptionsArray : Option[] = [];
    commentsMenuOptionsArray.push(commentsMenuOptions);

    const handleClickCard = (userName: string) => {
        navigate(`/profile/${userName}`);
    };

    return (
        <div className="row">
            <div className="col-12">
                <div  onClick={() => handleClickCard(autor.name)} className={style.recomendation__item}>
                    <div className="row d-flex align-items-center">
                        <div className="col-3">
                            <div className='d-flex align-items-center'>
                                <img src={autor.avatar} alt="avatar" />
                                <h3>{shortenText(autor.name, 11)}</h3>
                            </div>
                        </div>
                        <div className="col-7 d-flex align-items-center">
                            <p><TextPreview text={text} lenghtText={22}/></p>
                        </div>
                        <div className="col-2">
                            <DropMenu options={commentsMenuOptionsArray}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentsItem;