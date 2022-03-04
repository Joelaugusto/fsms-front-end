import { NextPage } from 'next'
import type { GetServerSidePropsContext } from 'next'

import { useState } from 'react'
import Container from './../components/chat/Message/container'
import Sidebar from './../components/chat/sidebar'
import session from '../utils/session'

const Message:NextPage = (props: any) => {
  const [isChatSelected, setIsChatSelected] = useState(false)
  const [messages, setMessages] = useState<any>([])

  const selectChat = async (id: number) => {
    setIsChatSelected(!isChatSelected)
    
    const resp = await fetch(`http://localhost:8080/api/v1/chats/${id}/messages`, {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer ' + props.token,
      }),
    })

    const msg = await resp.json();

    setMessages(msg.data.reverse())

  }

  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex w-full flex-row ">
        <Sidebar
          user={props.user}
          chats={props.chats}
          className={isChatSelected ? 'hidden' : ''}
          onSelectChat={selectChat}
        />
        <Container
          className={!isChatSelected ? 'hidden' : ''}
          goBack={selectChat}
          messages={messages}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  
  const user = await session.getLoggedUser(context);

  if(!user.props){
    return user;
  }

   const resp = await fetch('http://localhost:8080/api/v1/chats', {
     method: 'get',
     headers: new Headers({
       Authorization: 'Bearer ' + context.req.cookies.accessToken,
     }),
   })

   const chats = await resp.json()
  return {
    props: {
      user: user.props.user,
      chats: chats.data,
      token: context.req.cookies.accessToken //change after
    },
  }
}


export default Message
