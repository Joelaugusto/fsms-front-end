import { useState } from 'react'
import Container from './../components/chat/Message/container'
import Sidebar from './../components/chat/sidebar'

const Message = () => {
  const [isChatSelected, setIsChatSelected] = useState(false)

  const selectChat = () => {
    setIsChatSelected(!isChatSelected)
  }

  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex w-full flex-row ">
        <Sidebar
          className={isChatSelected ? 'hidden' : ''}
          onSelectChat={selectChat}
        />
        <Container
          className={!isChatSelected ? 'hidden' : ''}
          goBack={selectChat}
        />
      </div>
    </div>
  )
}

export default Message
