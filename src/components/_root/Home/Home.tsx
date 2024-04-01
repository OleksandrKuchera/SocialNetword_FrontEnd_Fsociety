import { Container } from "react-bootstrap";
import style from './style.module.scss';
import HomePost from "./HomePost/HomePost";
import RecomendationList from "./RecomendationList/RecomendationList";

const Home = () => {
    return (
        <>
            <div className="row">
                <div className="col-9">
                    <div className="row d-flex justify-content-center">
                        <div className="col-9">
                            <Container>
                                <div className={style.home__layout}>
                                    <div className="row">
                                        <HomePost />
                                        <HomePost />
                                        <HomePost />
                                        <HomePost />
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                <div className="col-3 m-0 p-0">
                    <RecomendationList />
                </div>
            </div>
        </>
    );
}

export default Home;