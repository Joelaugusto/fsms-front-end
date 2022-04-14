import { GetServerSidePropsContext } from 'next'
import HomeContainer from '../../components/home/HomeContainer'
import api from '../../utils/api'
import session from '../../utils/session'
import { useState } from 'react'
import GroupContainer from '../../components/home/group/container'

const Groups = (props: {
  user: any
  token: string
  groups: Array<any>
  otherGroups: any
}) => {
  const [groups, setGroups] = useState<Array<any>>(props.groups)

  const refresh = async () => {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + props.token

    const groupsData = await api.get('/groups')
    setGroups(groupsData.data)
  }

  return (
    <HomeContainer user={props.user} onSearch={() => {}}>
      <GroupContainer
        groups={groups}
        otherGroups={props.otherGroups}
        refresh={refresh}
      />
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

  if (!user.props) {
    return user
  }

  api.defaults.headers.common['Authorization'] =
		'Bearer ' + context.req.cookies.accessToken
	
	const groups = await api.get('/groups');
	const otherGroups = await api.get('/groups/top')


  return {
    props: {
			user: user.props.user,
      groups: groups.data, 
      otherGroups: otherGroups.data,
      token: context.req.cookies.accessToken, //change after
    },
  }
}

export default Groups
