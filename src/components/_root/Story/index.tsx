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
type StoryType = {
  id: number,
  author: Author,
  story: Story,
}

type Story = {
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
                const response = await axios.get<StoryType[]>(`https://socialnetword-fsociety.onrender.com/reels/reelsAll/${myProfile.name}`);
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
        <Story key={index} username={author.name} profilePic={author.avatar} storyImage={story.media} />
      )) : null}
    </div>
  );
}

export default StoryReel;

