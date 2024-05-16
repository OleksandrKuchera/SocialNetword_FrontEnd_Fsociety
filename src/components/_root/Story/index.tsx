import Story from './Story';
import './StoryReel.scss';
import CreateStory from './CreateStory';
import { userDataType } from '../HomeLayout/HomeLayout';
import { useEffect, useState } from 'react';
import { Author } from '../Home/Home';
import axios from 'axios';
import { ArrowDownward, ArrowUpward, Close } from '@mui/icons-material';

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
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);

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

  const openStory = (index: number) => {
    setCurrentStoryIndex(index);
  };

  const closeStory = () => {
    setCurrentStoryIndex(null);
  };

  const goToNextStory = () => {
    if (storyList && currentStoryIndex !== null && currentStoryIndex < storyList.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const goToPreviousStory = () => {
    if (storyList && currentStoryIndex !== null && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <div className='storyReel'>
      <CreateStory myProfile={myProfile} />
      {storyList ? storyList.map(({ author, story }, index) => (
        <Story key={index} author={author} story={story} onClick={() => openStory(index)} />
      )) : null}

      {currentStoryIndex !== null && storyList && (
        <div className="storyModal">
          <button onClick={closeStory}><Close/></button>
          <button onClick={goToNextStory}><ArrowUpward/></button>
          <video src={storyList[currentStoryIndex].story.media} controls autoPlay />
          <button onClick={goToPreviousStory}><ArrowDownward/></button>         
        </div>
      )}
    </div>
  );
}

export default StoryReel;
