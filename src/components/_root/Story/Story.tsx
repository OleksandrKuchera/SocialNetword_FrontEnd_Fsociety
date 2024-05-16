import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './StoryReel.scss';
import { Author } from '../Home/Home';
import { StoryAsk } from '.';
import { getVideoThumbnail } from '../functions/getVideoThumbnail';

interface StoryProps {
  author: Author,
  story: StoryAsk,
  onClick: () => void,
}

function Story(props: StoryProps): React.ReactElement {
  const { story, author, onClick } = props;
  const [thumbnail, setThumbnail] = useState<string>('');

  useEffect(() => {
    getVideoThumbnail(story.media)
      .then((thumb) => setThumbnail(thumb as string))
      .catch((e) => console.error('Error generating thumbnail:', e));
  }, [story.media]);

  return (
    <div
      className='story'
      onClick={onClick}
      style={{
        backgroundImage: `url(${thumbnail})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Avatar src={author.avatar} className='storyAvatar' />
      <h4>{author.name}</h4>
    </div>
  );
}

export default Story;
