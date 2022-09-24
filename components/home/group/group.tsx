import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import cookies from "../../../utils/cookies";

const Group = (props: { id: number, name: string, canJoin?: boolean }) => {   

  const router = useRouter()

    const joinGroup = async () => {
      api.defaults.headers.common['Authorization'] =
        'Bearer ' + cookies.getCookie('accessToken')
      
      try {
        await toast.promise(
          api.post(`/groups/${props.id}/join`).then((data: any) => {
            router.push({ pathname: `/groups/${props.id}` })
          }),
          {
            pending: 'Entrando',
            success: 'Agora faz parte desse grupo! 👌',
            error: 'Erro ao entrar no grupo! 🤯',
          }
        )
      } catch (e) {}
    }

    return (
      <div className="h-90 flex flex-col justify-between rounded-md bg-gradient-to-r from-emerald-600 to-emerald-400 p-6">
        {props.canJoin ? (
          <strong className=" truncate text-3xl font-thin text-indigo-50">
            {props.name}
          </strong>
        ) : (
          <Link href={`groups/${props.id}`}>
            <strong className="cursor-pointer truncate text-3xl font-thin text-indigo-50">
              {props.name}
            </strong>
          </Link>
        )}
        <div>
          <div className="flex flex-row-reverse">
            <small>X membros</small>
          </div>
          {props.canJoin ? <div className="mt-2 flex flex-row-reverse">
            <button
              className="rounded-md border-2 border-white bg-emerald-400 py-1 px-2 text-white hover:bg-white hover:text-emerald-400"
              onClick={joinGroup}
            >
              Entrar
            </button>
          </div>: null}
        </div>
      </div>
    )
}

export default Group;