import {FiArrowLeft} from 'react-icons/fi'

const MessageUserInfo = (props: {
  goBack: any
  username: string
  userrole: string
  profilePhoto: string
  chatName: string
}) => (
  <div className="relative flex items-center space-x-4">
    <button className="flex items-center" onClick={props.goBack}>
      <div className="md:hidden">
        <FiArrowLeft />
      </div>
      <div className="relative">
        <span className="absolute right-0 bottom-0 text-green-500">
          <svg width="20" height="20">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
          </svg>
        </span>
        <img
          src={`https://avatar.oxro.io/avatar.svg?name=${props.chatName && props.chatName.toUpperCase().replace(' ', '+')}`}
          alt="Avatar"
          className="h-10 w-10 rounded-full sm:h-12 sm:w-12"
        />
      </div>
    </button>
    <div className="flex flex-col leading-tight">
      <div className="flex items-center text-2xl">
        <span className="mr-3 text-base text-gray-700 sm:text-xl">
          {props.chatName}
        </span>
      </div>
      {/* <span className="hidden text-lg text-gray-600 md:flex">
        {props.userrole}
      </span> */}
    </div>
  </div>
)

export default MessageUserInfo;