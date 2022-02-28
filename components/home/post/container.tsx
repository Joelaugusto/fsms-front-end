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
          userImage="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          postBg="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
        />
        
      </div>
    </div>
  )
}


export default PostContainer;