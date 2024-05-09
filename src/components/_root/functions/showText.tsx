import { useState } from 'react';
import style from './style.module.scss'; 
import FixBrComponent from './fixBrText';

export const TextPreview = ({ text, lenghtText }: { text: string, lenghtText: number }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    e.preventDefault();
    setExpanded(!expanded);
  };

  const renderText = () => {
    if (text.length <= lenghtText || expanded) {
      return text;
    } else {
      return text.slice(0, lenghtText) + '...';
    }
  };

  const renderToggleButton = () => {
    if (text.length > lenghtText) {
      return (
        <button className={style.btn__toggle} onClick={toggleExpanded}>
          {expanded ? 'Згорнути' : 'Детальніше'}
        </button>
      );
    }
    return null;
  };

  return (
    <div className={style.preview__text}>
      <FixBrComponent text={renderText()}/>
      {renderToggleButton()}
    </div>
  );
};
