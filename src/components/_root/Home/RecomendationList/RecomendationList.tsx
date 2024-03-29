import RecomendationItem from '../RecomendationItem/RecomendationItem';
import style from './style.module.scss';

const RecomendationList = () => {
    return (
        <div className={style.recomendation__list}>
            <div className="row">
                <div className="col-12">
                    <h2 className={style.recomendation__title}>Recomendation List</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={style.recomendation__list__container}>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                            <RecomendationItem/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecomendationList;