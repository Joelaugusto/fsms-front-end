import {FiArrowLeft} from 'react-icons/fi'

const MessageUserInfo = (props: {goBack: any}) => (
  <div className="relative flex items-center space-x-4">
    <button className="flex items-center" onClick={props.goBack}>
      <div className='md:hidden'>
        <FiArrowLeft />
      </div>
      <div className="relative">
        <span className="absolute right-0 bottom-0 text-green-500">
          <svg width="20" height="20">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
          </svg>
        </span>
        <img
          src="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
          alt="Avatar"
          className="h-10 w-10 rounded-full sm:h-16 sm:w-16"
        />
      </div>
    </button>
    <div className="flex flex-col leading-tight">
      <div className="mt-1 flex items-center text-2xl">
        <span className="mr-3 text-base text-gray-700 sm:text-xl">
          Joel Augusto
        </span>
      </div>
      <span className="hidden text-lg text-gray-600 md:flex">
        Engenheiro Informático
      </span>
    </div>
  </div>
)

export default MessageUserInfo;