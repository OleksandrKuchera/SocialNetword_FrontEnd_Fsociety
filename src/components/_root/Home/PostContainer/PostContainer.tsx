import { CircularProgress } from "@mui/material";
import HomePost from "../HomePost/HomePost";
import { PostData } from "../Home";
import { userDataType } from "../../HomeLayout/HomeLayout";

type PostContainerProps = {
    posts: PostData[],
    myProfile: userDataType
}

const PostContainer = ({posts, myProfile} : PostContainerProps) => {
    return ( 
        <div className="row">
        {(posts.length != 0) ? (
            posts.map((post, index) => (
                <div key={index} className="col-12">
                    <HomePost
                        myProfile={myProfile}
                        key={index}
                        postData={post}
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
 
export default PostContainer;