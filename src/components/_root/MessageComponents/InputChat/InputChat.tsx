import { useState } from 'react'
import InputEmoji from 'react-input-emoji'

export default function InputChat() {
  const [text, setText] = useState('')

  function handleOnEnter(text: string) {
    console.log('enter', text)
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