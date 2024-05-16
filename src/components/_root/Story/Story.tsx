import { Avatar } from '@mui/material';
import React from 'react';
import './StoryReel.scss';
import { Author } from '../Home/Home';
import { StoryAsk } from '.';
import { getVideoThumbnail } from '../functions/getVideoThumbnail';

interface StoryProps {
  author: Author,
  story: StoryAsk,
}

function Story(props: StoryProps): React.ReactElement {
  const { story, author } = props;
  const thumbnailUrl = getVideoThumbnail(story.media);

  return (
    <div
      className='story'
      style={{
        backgroundImage: `url(${thumbnailUrl})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Avatar src={author.avatar} className='storyAvatar' />
      <h4>{author.name}</h4>
    </div>
  );
}

export default Story;
