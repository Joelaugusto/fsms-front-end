import Link from "next/link";


const Post = (props: {title: string, views: string, date: Date, userImage: string, postBg: string, id:number}) => {

  return (
    <Link href={`/posts/${props.id}`}>
      <div className="max-w-md cursor-pointer overflow-hidden rounded-t-md shadow-lg">
        <img className="aspect-video" src={props.postBg} alt="Post Image" />
        <div className="relative p-2">
          <p className="mt-6 text-gray-900">{props.title}</p>
          <p className="text-xs text-gray-500">
            {`${props.views} visualizações`} • {props.date}
          </p>
          <img
            className="absolute -top-6 right-6 h-12 w-12 rounded-full border-2 p-0.5"
            src={props.userImage}
            alt="User Image"
          />
        </div>
      </div>
    </Link>
  )
}


export default Post;