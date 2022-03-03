import { NextPage } from 'next'
import type { GetServerSidePropsContext } from 'next'

import { useState } from 'react'
import Container from './../components/chat/Message/container'
import Sidebar from './../components/chat/sidebar'
import session from '../utils/session'

const Message:NextPage = (props: any) => {
  const [isChatSelected, setIsChatSelected] = useState(false)

  const selectChat = () => {
    setIsChatSelected(!isChatSelected)
  }

  return (
    <div className="flex h-screen text-gray-800 antialiased">
      <div className="flex w-full flex-row ">
        <Sidebar user={props.user}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return session.getLoggedUser(context)
}

export default Message
