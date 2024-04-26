import { useState } from 'react';
import InputEmoji from 'react-input-emoji';
import './style.scss';

interface InputChatProps {
  onEnter: (text: string) => void;
  placeholder: string
}

export default function InputChat({ onEnter, placeholder }: InputChatProps) {
  const [text, setText] = useState('')

  function handleOnEnter(text: string) {
    text.trim().length > 0 ? onEnter(text) : null;
  }

  return (
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      shouldReturn
      placeholder={placeholder}
    />
  )
}
