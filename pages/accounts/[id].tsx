import { GetServerSidePropsContext, NextPage } from 'next'
import { useState } from 'react'
import HomeContainer from '../../components/home/HomeContainer'
import api from '../../utils/api'
import session from '../../utils/session'
import { FiMail, FiPieChart, FiSmartphone, FiUser } from 'react-icons/fi'
import router from 'next/router'
const Settings: NextPage = (props: any) => {
  const [profilePhoto, setProfilePhoto] = useState<string>(
    props.user.profilePhotoUrl
      ? process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL + props.foundUser.profilePhotoUrl
      : `https://avatar.oxro.io/avatar.svg?name=${
          props.user?.name ? props.user.name.replace(' ', '+') : ''
        }`
  )

  return (
    <HomeContainer user={props.user} onSearch={() => {}}>
      <div className="grid grid-cols-4">
        <div className="col-span-3 p-10">
          <div>
            <h2>Sobre nós</h2>
          </div>
          <div>
            <h2>Contactos</h2>
          </div>
        </div>
        <div className="col-span-1 flex h-full flex-col items-center border-l p-4">
          <div className="flex w-full flex-col items-center border-b p-4">
            <img
              className="my-5 h-40 w-40 rounded-full border-8 border-emerald-600 p-1"
              src={profilePhoto}
            />
            <p className="text-center">{props.foundUser.name}</p>
            <button
              onClick={async () => {
                await api
                  .post('chats', {
                    members: [props.foundUser.id],
                    name: props.foundUser.name,
                  })
                  .then((data) => {
                    router.push(`/messages?selected=${data.data.id}`)
                  })
              }}
              className="mt-4 flex items-center gap-1 rounded-md border border-emerald-600 bg-emerald-600 py-1 px-2 text-white shadow-md hover:bg-white hover:text-emerald-600"
            >
              Contactar <FiMail size={18} />
            </button>
          </div>
          <div className="py-8">
            <div className="font-xl mt-4">
              <FiUser className="inline" size={20} />{' '}
              <span className="ml-4">{props.foundUser.role} </span>
            </div>
            <div className="font-xl mt-4">
              <FiSmartphone className="m-r-10 inline" size={20} />
              <span className="ml-4">{props.foundUser.phone}</span>
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
  let user

  try {
    user = await session.getLoggedUser(context)
  } catch (error) {
    return {
      redirect: {
        destination: '/auth/login',
      },
    }
  }
    
  const { id } = context.params as any
 
    let foundUser = null;
    
    await api.get(`users/${id}`).then(user => {
        foundUser = user.data;
  })
    


  return {
    props: {
      user,
      foundUser,
    },
  }
}

export default Settings
