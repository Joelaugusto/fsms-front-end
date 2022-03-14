
import SockJsClient from 'react-stomp'

import { useEffect, useState, useRef } from 'react'

const SOCKET_URL = 'http://localhost:8080/stomp'


const ChatRoom = () => {

  let clientRef = useRef()
  const [typedMessage, setTypedMessage] = useState('')
  const [message, setMessage] = useState('You server message here.')

  const onConnected = () => {
    console.log('Connected!!')
  }

  const onMessageReceived = (msg) => {
    console.log('message received')
    setMessage(msg.message)
  }


  const sendMessage = () => {
    console.log('Sending message...')
        clientRef.sendMessage('/app/messages-all', JSON.stringify({
            chatId: 1,
            message: typedMessage
        }));
    };

  return (
    <div style={{ display: 'block' }}>
      <input
        type="text"
        style={{ border: 'solid 2px black' }}
        placeholder="text"
        value={typedMessage}
        onChange={(e) => setTypedMessage(e.target.value)}
      />
      <button onClick={() => sendMessage()}>Send</button>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/messages']}
        onConnect={onConnected}
        onDisconnect={console.log('Disconnected!')}
        onMessage={(msg) => {
          console.log(msg)
          onMessageReceived(msg)
        }}
        debug={false}
        ref={(client) => {
          clientRef = client
        }}
      />
      <div>{message}</div>
    </div>
  )
}

export default ChatRoom
