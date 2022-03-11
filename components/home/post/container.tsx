import Post from "./post";

import dateUtil from "../../../utils/dateUtil";


const PostContainer = (props:{posts: Array<any>}) => {

  return (
    <div className="mx-6 my-20">
      <h1 className="my-6 text-3xl">Postagens</h1>
      <div className="mt-10 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {props.posts.map((post) => (
          <Post
            title={post.title}
            views={post.visualizations}
            date={dateUtil.timeAgo(post.createdAt)}
            userImage="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
            postBg="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
          />
        ))}
      </div>
    </div>
  )
}


export default PostContainer;