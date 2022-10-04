import { GetServerSidePropsContext, NextPage } from "next";
import { useState} from 'react'
import { ProfilePhotoUploader } from "../components/global/ProfilePhotoUploader";
import HomeContainer from "../components/home/HomeContainer";
import PostContainer from "../components/home/post/container";
import Post from "../components/home/post/post";
import api from "../utils/api";
import dateUtil from "../utils/dateUtil";
import session from "../utils/session";

const Settings: NextPage = (props: any) => {

  const profilePhoto: string = props.user.profilePhotoUrl
    ? process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + props.user.profilePhotoUrl
    : `https://avatar.oxro.io/avatar.svg?name=${
        props.user?.name ? props.user.name.replace(' ', '+') : ''
      }`


  const [image, setImage] = useState([]);

  const setPictures = (images: any) => {
    setImage(images)
    if (images[0]) {
      
      api.put('users/profile-photo', images[0])
    }
  }
    return (
      <HomeContainer user={props.user} onSearch={() => {}}>
        <div className="grid h-[calc(100vh-115px)] grid-cols-3 overflow-auto">
          <div className="col-span-2 border-r border-l-slate-800 p-8">
            <p>Nome: {props.user.name}</p>
            <p>Função: {props.user.role}</p>
            <p>Celular: {props.user.phone}</p>
            <p>Biografia: {}</p>
          </div>
          <div className="col-span-1">
            <ProfilePhotoUploader
              setImages={setPictures}
              profilePhoto={profilePhoto}
            />
            <div className="p-4">
              <p>Minhas Postagens</p>
              <div className="mt-4 grid gap-6 xl:grid-cols-2">
                {props.posts.map((post: any) => (
                  <Post
                    id={post.id}
                    key={post.id}
                    title={post.title}
                    views={post.visualizations}
                    date={dateUtil.timeAgo(post.createdAt)}
                    userImage={
                      post.userProfilePhotoUrl
                        ? process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL +
                          post.userProfilePhotoUrl
                        : `https://avatar.oxro.io/avatar.svg?name=${
                            post.username ? post.username.replace(' ', '+') : ''
                          }`
                    }
                    postBg={
                      post.images[0]
                        ? process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL +
                          post.images[0]?.path
                        : `https://avatar.oxro.io/avatar.svg?name=${
                            post.title
                              ? post.title.toUpperCase().replace(' ', '+')
                              : ''
                          }`
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </HomeContainer>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let user, posts

  try {
    user = await session.getLoggedUser(context)
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
      },
    }
  }

await api.get(
    'posts?onlyCreatedByMe=true'
).then((data) => {
    posts = data?.data?.data ?? [];
})
  
  console.log(posts)

  return {
    props: {
      user,
      posts
    },
  }
}



export default Settings;