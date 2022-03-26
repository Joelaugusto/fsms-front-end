import type { GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";
import api from "../utils/api";
import session from "../utils/session";


const Groups:NextPage = (props:any) => {


  const [groups, setgroups] = useState<Array<{id:number, name: string}>>(props.groups)

  const joinToGroupHandler = async(groupId:number) => {
    api.defaults.headers.common['Authorization'] =
      'Bearer ' + props.token
    await api.post(`chats/${groupId}/join`)
  }

  return(<div>
    <h1>Groups</h1>
    {
      groups?.map(group => 

        <div key={group.id}>
          <h2>{group.name}</h2>
          <button onClick={() => joinToGroupHandler(group.id)}>Join</button>
        </div>
      )
    }
    <button></button>
  </div>)

}

export const getServerSideProps = async (context:GetServerSidePropsContext) => {
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

  if (!user.props) {
    return user
  }

  api.defaults.headers.common['Authorization'] =
    'Bearer ' + context.req.cookies.accessToken

  const chats = await api.get('/chats/top-groups')

  return {
    props: {
      user: user.props.user,
      groups: chats.data,
      token: context.req.cookies.accessToken, //change after
    },
  }
}


export default Groups;

