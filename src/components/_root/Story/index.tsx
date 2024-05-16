import Story from './Story';
import './StoryReel.scss';
import CreateStory from './CreateStory';
import { userDataType } from '../HomeLayout/HomeLayout';
import { useEffect, useState } from 'react';
import { Author } from '../Home/Home';
import axios from 'axios';

interface StoryReelProps {
  myProfile: userDataType,
}
export type StoryType = {
  id: number,
  author: Author,
  story: StoryAsk,
}

export type StoryAsk = {
  media: string,
  description: string,
  comments: [],
  like: 0
}

const StoryReel = ({myProfile} : StoryReelProps) => {
  const [storyList, setStoryList] = useState<StoryType[]>();

  useEffect(() => {
    if (myProfile) {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<StoryType[]>(`https://socialnetword-fsociety.onrender.com/stories/stories_all`);
                  const sortedPosts = response.data.sort((a, b) => b.id - a.id);
                  setStoryList(sortedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }
}, [myProfile]);
  
  return (
    <div className='storyReel'>
      <CreateStory myProfile = {myProfile}/>
      {storyList ? storyList.map(({ author, story }, index) => (
        <Story key={index} author={author} story={story} />
      )) : null}
    </div>
  );
}

export default StoryReel;

