import Post from "./post";

const PostContainer = () => {


  return (
    <div className="mx-6 my-20">
      <h1 className="my-6 text-3xl">Postagens</h1>
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Post
          title="Rotação de Culturas"
          views="53K visualizações"
          date="2 semanas atrás"
          userImage="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
          postBg="https://avatar.oxro.io/avatar.svg?name=Joel+Augusto"
        />
      </div>
    </div>
  )
}


export default PostContainer;