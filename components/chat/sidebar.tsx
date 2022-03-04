import Conversations from './conversations'
import UserInfo from './userInfo'
import { IoArrowBack } from 'react-icons/io5'
import Link from 'next/link'

const Sidebar = (props: { className: string; onSelectChat: Function, user: any, chats: any }) => {
  return (
    <div
      className={`${props.className} md:flex h-screen w-full flex-shrink-0 flex-col bg-white py-5 pl-6 pr-2 md:w-64`}
    >
      <div className="h-64">
        <div className="flex h-12 w-full">
          <Link href="/">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <IoArrowBack />
            </div>
          </Link>
          <div className="ml-2 text-2xl font-bold">Conversas</div>
        </div>
        <UserInfo user={props.user}/>
      </div>
      <Conversations onSelectChat={props.onSelectChat} chats={props.chats}/>
    </div>
  )
}

export default Sidebar
