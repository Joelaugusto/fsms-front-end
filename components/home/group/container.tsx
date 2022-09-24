
import { FiPlusCircle } from "react-icons/fi";
import Group from "./group";
import { Formik, Form } from "formik";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import Input from "../../global/Input";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import * as Yup from 'yup'

const GroupContainer = (props: {
  groups: Array<any>
  otherGroups: { meta: any; data: Array<any> }
  refresh: Function
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)


  const newGroup = async (form: { name: string }, setSubmitting: Function) => {
    setSubmitting(true)

    try {
      await toast.promise(
        api
          .post('/groups', form)
          .then((data: any) => {
            setShowModal(false)
          })
          .then(() => {
            props.refresh()
          }),
        {
          pending: 'A criar grupo!',
          success: 'Grupo criado com sucesso! 👌',
          error: 'Erro ao criar grupo! 🤯',
        }
      )
    } catch (e) {}
  }

  const modal = (
    <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center bg-white p-5">
      <h1 className="m-20 text-3xl">Criar novo grupo</h1>
      <div className="w-full bg-white md:w-1/3">
        <MdClose
          size={25}
          className="fixed top-5 right-5"
          onClick={() => {
            setShowModal(false)
          }}
        />
        <Formik
          initialValues={{ name: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Este campo é Obrigatório')
              .min(2, 'O nome deve ter pelo menos 2 caracteres'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            newGroup(values, setSubmitting)
          }}
        >
          <Form noValidate>
            <Input
              label="Nome do grupo"
              type="text"
              name="name"
              placeholder="Digite o nome do grupo"
            />

            <Input
              type="submit"
              value="Criar Grupo"
              icon={<BsFileEarmarkPlus />}
            />
          </Form>
        </Formik>
      </div>
    </div>
  )

  return (
    <div className="mx-6">
      {showModal ? modal : null}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="my-6 text-xl">Grupos</h1>
          <button
            className="flex gap-2 rounded-md bg-emerald-600 p-2 text-white"
            onClick={() => {
              setShowModal(true)
            }}
          >
            Criar novo grupo <FiPlusCircle size={25} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4 md:grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {props.groups.map((group) => (
            <Group key={group.id} name={group.name} id={group.id} />
          ))}
        </div>
      </div>

      <div>
        <div className="mt-20 flex items-center gap-2">
          <h1 className="my-4 text-xl">Alguns grupos populares</h1>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {props.otherGroups.data.map((group) => (
            <Group
              key={group.id}
              name={group.name}
              id={group.id}
              canJoin={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


export default GroupContainer;