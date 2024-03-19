import NotificationModalComponent from "../Dialog/NotificationModalComponent/NotificationModalComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import SettingModalComponent from "../Dialog/SettingModalComponent/SettingModalComponent";
import SaveModalComponent from "../Dialog/SaveModalComponent/SaveModalComponent";


const TopHomeContainer = () => {
    return (
        <div className="search__container d-flex justify-content-between mt-2">
            <SearchComponent />
            <SettingModalComponent />
            <NotificationModalComponent/>
            <SaveModalComponent/>
        </div>
    );
}

export default TopHomeContainer;