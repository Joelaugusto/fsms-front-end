import Conversations from './conversations'
import { IoArrowBack } from 'react-icons/io5'
import Link from 'next/link'

const Sidebar = (props: { className: string; onSelectChat: Function, user: any, chats: any }) => {
  return (
    <div
      className={`${props.className} h-screen w-full flex-shrink-0 flex-col bg-white py-5 pl-6 pr-2 md:flex md:w-64`}
    >
      <div className="flex h-12  w-full items-center">
        <Link href="/">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <IoArrowBack />
          </div>
        </Link>
        <div className="ml-2 text-xl font-bold">Conversas</div>
      </div>
      <Conversations onSelectChat={props.onSelectChat} chats={props.chats} />
    </div>
  )
}

export default Sidebar
