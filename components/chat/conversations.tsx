import { FiSearch } from "react-icons/fi";
import ChatGroup from "./chatGroup";

const Conversations = (props: { onSelectChat : Function, chats: any}) => {
  return (
    <div className="mt-8 flex max-h-full flex-col">
      <div className="mb-10 flex w-full items-center space-x-3 rounded-md bg-gray-100 px-4 py-2">
        <input
          type="text"
          placeholder=""
          className="w-full bg-gray-100 outline-none"
        />
        <FiSearch />
      </div>
      <ChatGroup onSelectChat={props.onSelectChat} chats={props.chats} title="Conversas Activas" />
      {/* <ChatGroup title="Conversas Arquivadas" /> */}
    </div>
  )
}


export default Conversations;