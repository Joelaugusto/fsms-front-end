const Ads = (props: {title: string, date: string, views: string, user: string, userImage: string}) => {

  return (
    <div className="h-90 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-400	 p-6">
      <p className="cursor-pointer text-xl font-thin text-indigo-50">
        {props.title}
      </p>
      <div className="mt-4 flex items-center space-x-4">
        <img
          className="h-10 w-10 cursor-pointer rounded-full"
          alt="User Image"
          src={props.userImage}
        />
        <div>
          <h3 className="cursor-pointer font-semibold text-indigo-50">
            {props.user}
          </h3>
          <p className="text-sm font-thin text-indigo-50">
            {props.views} • {props.date}
          </p>
        </div>
      </div>
    </div>
  )
}


export default Ads;