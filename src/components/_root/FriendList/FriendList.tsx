import FriendItem from './FriendItem';
import style from './style.module.scss';
import PeopleItem from './PeopleItem';
import SearchComponent from '../../__ui/SearchComponent/SearchComponent';

const FrendList = () => {
    return (
        <div className="container">
            <div className={style.friends__container}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <h2>Society</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <SearchComponent />
                    </div>
                </div>
                <div className="row">
                    <FriendItem />
                    <PeopleItem />
                </div>
            </div>
        </div >
    );
}

export default FrendList;