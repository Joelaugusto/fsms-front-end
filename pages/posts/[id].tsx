import { NextPage } from "next";
import { useRouter } from "next/router";


const Post:NextPage = (props) => {

    const router = useRouter()
    const { id } = router.query
  return (<div>
    post div {id}
  </div>)
}

export default Post;