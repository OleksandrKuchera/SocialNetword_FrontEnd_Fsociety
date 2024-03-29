import style from './style.module.scss';
import avatar from '../../../../assets/avatar.png'

const RecomendationItem = () => {
    return (
        <div className="row">
            <div className="col-12">
                <div className={style.recomendation__item}>
                    <div className='d-flex align-items-center'>
                        <img src={avatar} alt="avatar" />
                        <h3>Antoni Kakaha</h3>
                    </div>
                    <button>Follow</button>
                </div>
            </div>
        </div>
    );
}

export default RecomendationItem;