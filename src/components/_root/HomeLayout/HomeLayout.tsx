import Sidebar from "./Sidebar/Sidebar";
import './homeLayout.scss'
import { Outlet} from "react-router-dom";


const HomeLayout = () => {
    return (
        <div className="container-fluid home__layout">
            <div className="row">
                <div className="col-md-2 p-0">
                    <Sidebar />
                </div>
                <div className="col-md-10 p-0">
                    <div className="background__central">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLayout;