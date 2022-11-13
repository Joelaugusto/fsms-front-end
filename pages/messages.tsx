import { NextPage } from 'next'
import { useRouter } from 'next/router'
import type { GetServerSidePropsContext } from 'next'
import { useState, useEffect} from 'react'
import Container from './../components/chat/Message/container'
import Sidebar from './../components/chat/sidebar'
import session from '../utils/session'

import api from '../utils/api'
const Message: NextPage = (props: any) => {
  const router = useRouter();
  const [isChatSelected, setIsChatSelected] = useState(false)
  const [messages, setMessages] = useState<Array<any>>([])
  const [chatId, setChatId] = useState<number>(0)
  const [chatName, setChatName] = useState<string>('')
  const [chatIcon, setChatIcon] = useState<string>('')

  const { selected } = router.query

  useEffect(() => {
    
    if (selected) {
      handleSelectChat(Number.parseInt(`${selected}`))
    }

  
  }, [])
  

  const onMessageReceived = (message: any) => {
    let msg = message
    if(msg.sentById !== props.user.id){
      msg.received = true;
    }


    setMessages([...messages, msg])
  }


  const handleSelectChat = async (id: number) => {
    setIsChatSelected(true)
    api.defaults.headers.common['Authorization'] = 'Bearer ' + props.token
    const resp = await api.get(`chats/${id}/with-messages`)
    setChatId(id)
    const data = resp.data
    setChatName(data.name)
    setMessages(data.message.reverse())
    setChatIcon(data.chatIcon)
    // setUsername(data.name)
    // setUserRole(data.userRole)
  }

  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex w-full flex-row ">
        <Sidebar
          user={props.user}
          chats={props.chats}
          className={isChatSelected ? 'hidden' : ''}
          onSelectChat={handleSelectChat}
        />
        <Container
          onMessageReceived={onMessageReceived}
          className={!isChatSelected ? 'hidden' : ''}
          goBack={() => {
            setIsChatSelected(false)
          }}
          messages={messages}
          chatId={chatId}
          chatName={chatName}
          user={props.user}
          chatIcon={chatIcon}
        />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  
  const user = await session.getLoggedUser(context);

  const chats = await api.get('/chats/resume')

  return {
    props: {
      user,
      chats: chats.data,
      token: context.req.cookies.accessToken //change after
    },
  }
}

export default Message
