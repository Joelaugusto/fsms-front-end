const Post = (props: {title: string, views: string, date: Date, userImage: string, postBg: string}) => {

  return (
    <div className="overflow-hidden rounded-t-md shadow-lg ">
      <div className="">
        <img className="w-sm" src={props.postBg} alt="Post Image" />
        <div className="relative p-2">
          <p className="mt-6 text-lg font-semibold">{props.title}</p>
          <p>
            {`${props.views} visualizações`} • {props.date}
          </p>
          <img
            className="absolute -top-6 right-6 h-12 w-12 rounded-full border-2 p-0.5"
            src={props.userImage}
            alt="User Image"
          />
        </div>
      </div>
    </div>
  )
}


export default Post;