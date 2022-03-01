import { FiSearch } from "react-icons/fi";
import ChatGroup from "./chatGroup";

const Conversations = () => {

  return (
    <div className="mt-8 flex flex-col max-h-full">
      <div className="flex w-full mb-10 items-center space-x-3 rounded-md bg-gray-100 px-4 py-2">
        <input
          type="text"
          placeholder=""
          className="w-full bg-gray-100 outline-none"
        />
        <FiSearch />
      </div>
      <ChatGroup title="Conversas Activas" />
      {/* <ChatGroup title="Conversas Arquivadas" /> */}
    </div>
  )
}


export default Conversations;