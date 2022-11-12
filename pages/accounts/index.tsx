import { GetServerSidePropsContext, NextPage } from "next";
import { useState} from 'react'
import { ProfilePhotoUploader } from "../../components/global/ProfilePhotoUploader";
import HomeContainer from "../../components/home/HomeContainer";
import api from "../../utils/api";
import session from "../../utils/session";
import { FiPieChart, FiSmartphone, FiUser } from "react-icons/fi";
const Settings: NextPage = (props: any) => {

  const [profilePhoto, setProfilePhoto] = useState<string>(
    props.user.profilePhotoUrl
      ? process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + props.user.profilePhotoUrl
      : `https://avatar.oxro.io/avatar.svg?name=${
          props.user?.name ? props.user.name.replace(' ', '+') : ''
        }`
  ) 


  const [image, setImage] = useState([]);

  const setPictures = async(images: any) => {
    setImage(images)
    if (images[0]) {
      await api.put('users/profile-photo', images[0]).then((data:any) => {
        setProfilePhoto(
          process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + data.data.path
        )
       });
    }
  }
    return (
      <HomeContainer user={props.user} onSearch={() => {}}>
        <div className="grid grid-cols-4">
          <div className="col-span-3 p-10">
            <div>
              <h2 className="font-large mb-5 font-semibold">Sobre nós</h2>
              <p>
                Praesent sapien massa, convallis a pellentesque nec, egestas non
                nisi. Curabitur non nulla sit amet nisl tempus convallis quis ac
                lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec sollicitudin molestie malesuada. Cras ultricies ligula sed
                magna dictum porta. Donec rutrum congue leo eget malesuada.
                Vivamus suscipit tortor eget felis porttitor volutpat. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
                ullamcorper sit amet ligula. Vivamus magna justo, lacinia eget
                consectetur sed, convallis at tellus. Curabitur aliquet quam id
                dui posuere blandit. Vestibulum ante ipsum primis in faucibus
                orci luctus et ultrices posuere cubilia Curae; Donec velit
                neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                Donec rutrum congue leo eget malesuada. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Donec velit neque, auctor sit amet aliquam vel,
                ullamcorper sit amet ligula. Praesent sapien massa, convallis a
                pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.
                Curabitur non nulla sit amet nisl tempus convallis quis ac
                lectus. Praesent sapien massa, convallis a pellentesque nec,
                egestas non nisi. Proin eget tortor risus. Curabitur aliquet
                quam id dui posuere blandit. Vivamus magna justo, lacinia eget
                consectetur sed, convallis at tellus. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed porttitor lectus nibh.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                suscipit tortor eget felis porttitor volutpat. Quisque velit
                nisi, pretium ut lacinia in, elementum id enim. Curabitur arcu
                erat, accumsan id imperdiet et, porttitor at sem. Nulla quis
                lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet
                quam vehicula elementum sed sit amet dui. Proin eget tortor
                risus. Nulla porttitor accumsan tincidunt. Vestibulum ac diam
                sit amet quam vehicula elementum sed sit amet dui. Quisque velit
                nisi, pretium ut lacinia in, elementum id enim. Proin eget
                tortor risus. Quisque velit nisi, pretium ut lacinia in,
                elementum id enim. Quisque velit nisi, pretium ut lacinia in,
                elementum id enim. Proin eget tortor risus. Vestibulum ac diam
                sit amet quam vehicula elementum sed sit amet dui. Curabitur
                arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur
                arcu erat, accumsan id imperdiet et, porttitor at sem. Donec
                sollicitudin molestie malesuada. Nulla quis lorem ut libero
                malesuada feugiat. Proin eget tortor risus. Vivamus suscipit
                tortor eget felis porttitor volutpat. Curabitur non nulla sit
                amet nisl tempus convallis quis ac lectus. Curabitur arcu erat,
                accumsan id imperdiet et, porttitor at sem. Quisque velit nisi,
                pretium ut lacinia in, elementum id enim. Proin eget tortor
                risus. Donec rutrum congue leo eget malesuada. Sed porttitor
                lectus nibh.
              </p>
            </div>
            <div>
              <h2 className="font-large mb-5 mt-10 font-semibold">Contactos</h2>
              <p>Email: {props.user.email}</p>
              <p>Telefone: {props.user.phone}</p>
            </div>
          </div>
          <div className="col-span-1 flex h-full flex-col items-center border-l p-4">
            <div className="flex w-full flex-col items-center border-b p-4">
              <img
                className="my-5 h-40 w-40 rounded-full border-8 border-emerald-600 p-1"
                src={profilePhoto}
              />
              <ProfilePhotoUploader
                setImages={setPictures}
                profilePhoto={profilePhoto}
              />
              <p className="text-center">{props.user.name}</p>
            </div>
            <div className="py-8">
              <div className="font-xl mt-4">
                <FiUser className="inline" size={20} />{' '}
                <span className="ml-4">{props.user.role} </span>
              </div>
              <div className="font-xl mt-4">
                <FiSmartphone className="m-r-10 inline" size={20} />
                <span className="ml-4">{props.user.phone}</span>
              </div>
              <div className="font-xl mt-4">
                <FiPieChart className="m-l-10 inline" size={20} />{' '}
                <span className="ml-4">2 Toneladas por ano</span>
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