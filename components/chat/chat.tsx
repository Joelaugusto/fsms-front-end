import { useState } from 'react';
import Container from './Message/container'
import Sidebar from './sidebar'


const Chat = () => {

  const [isChatSelected, setIsChatSelected] = useState(false);

  const selectChat = () => {
    setIsChatSelected(!isChatSelected);
  }

  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex w-full flex-row ">
        <Sidebar className={isChatSelected ? 'hidden' : ''} onSelectChat={selectChat} />
        <Container className={!isChatSelected ? 'hidden' : ''} goBack={selectChat}/>
      </div>
    </div>
  )
}

export default Chat
