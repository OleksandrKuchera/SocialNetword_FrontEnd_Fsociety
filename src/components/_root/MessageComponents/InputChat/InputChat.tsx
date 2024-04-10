import { useState } from 'react'
import InputEmoji from 'react-input-emoji'

interface InputChatProps {
  onEnter: (text: string) => void;
}

export default function InputChat({ onEnter }: InputChatProps) {
  const [text, setText] = useState('')

  function handleOnEnter(text: string) {
    console.log('enter', text)
    onEnter(text);
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
