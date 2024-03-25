import MyProfilePost from '../MyProfilePost/MyProfilePost';
import style from './style.module.scss';

const MyProfileDesc = () => {
    return (
        <div className={style.desc__container}>
            <div className="row">
                <MyProfilePost />
                <MyProfilePost />
                <MyProfilePost />
                <MyProfilePost />
                <div className="col-12">
                    <p className={style.nothing__posted}> Nothing posted</p>
                </div>
            </div>
        </div>
    );
}

export default MyProfileDesc;