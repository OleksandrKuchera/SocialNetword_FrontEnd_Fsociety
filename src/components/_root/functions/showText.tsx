import { useState } from 'react';
import style from './style.module.scss'; 

export const TextPreview = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderText = () => {
    if (text.length <= 40 || expanded) {
      return text;
    } else {
      return text.slice(0, 40) + '...';
    }
  };

  const renderToggleButton = () => {
    if (text.length > 40) {
      return (
        <button className={style.btn__toggle} onClick={toggleExpanded}>
          {expanded ? 'Згорнути' : 'Детальніше'}
        </button>
      );
    }
    return null;
  };

  return (
    <div>
      {renderText()}
      {renderToggleButton()}
    </div>
  );
};
