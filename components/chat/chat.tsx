
import Container from './Message/container'
import Sidebar from './sidebar'


const Chat = () => {
  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex w-full flex-row ">
        <Sidebar/>
        <Container/>
      </div>
    </div>
  )
}

export default Chat
