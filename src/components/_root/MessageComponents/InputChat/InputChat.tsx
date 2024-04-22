import { useState } from 'react'
import InputEmoji from 'react-input-emoji'

interface InputChatProps {
  onEnter: (text: string) => void;
}

export default function InputChat({ onEnter }: InputChatProps) {
  const [text, setText] = useState('')

  function handleOnEnter(text: string) {
    text.trim().length > 0 ? onEnter(text): null;
  }

  return (
    <InputEmoji
      value={text}
      onChange={setText}
      cleanOnEnter
      onEnter={handleOnEnter}
      shouldReturn
      placeholder="Type a message"
    />
  )
}
