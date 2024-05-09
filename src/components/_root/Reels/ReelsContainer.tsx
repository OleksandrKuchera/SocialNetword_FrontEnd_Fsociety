import { CircularProgress } from "@mui/material";
import {  ReelsData } from "../Home/Home";
import { userDataType } from "../HomeLayout/HomeLayout";
import ReelsPost from "./ReelsPost";

type PostContainerProps = {
    reels: ReelsData[],
    myProfile: userDataType
}

const ReelsContainer = ({reels, myProfile} : PostContainerProps) => {
    return ( 
        <div className="row">
        {(reels.length != 0) ? (
            reels.map((reel, index) => (
                <div key={index} className="col-12">
                    <ReelsPost
                        myProfile={myProfile}
                        key={index}
                        postData={reel}
                    />
                </div>
            ))
        ) : (
            <div className="col-12">
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress color="success" />
                </div>
            </div>
        )}

    </div>
     );
}
 
export default ReelsContainer;