import Link from "next/link";


const Post = (props: {title: string, views: string, date: Date, userImage: string, postBg: string, id:number}) => {

  return (
    <Link href={`/posts/${props.id}`}>
      <div className="overflow-hidden rounded-t-md shadow-lg cursor-pointer">
          <img className="w-sm" src={props.postBg} alt="Post Image" />
          <div className="relative p-2">
            <p className="mt-6 text-lg">{props.title}</p>
            <p className="text-sm text-gray-500">
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