import { userDataType } from '../../UserProfile/UserProfile';
import MyProfilePost from '../MyProfilePost/MyProfilePost';
import style from './style.module.scss';

type MyProfileDescProps = {
    userData: userDataType;
}

const MyProfileDesc: React.FC<MyProfileDescProps> = ({ userData }) => {
    return (
        <div className={style.desc__container}>
            <div className="row">
                <MyProfilePost userData={userData} />
                <MyProfilePost userData={userData} />
                <MyProfilePost userData={userData} />
                <MyProfilePost userData={userData} />
                <div className="col-12">
                    <p className={style.nothing__posted}> Nothing posted</p>
                </div>
            </div>
        </div>
    );
}

export default MyProfileDesc;
