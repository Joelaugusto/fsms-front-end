import React from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { AiFillDelete, AiFillSetting } from 'react-icons/ai'
import { FiPlusCircle, FiUser } from 'react-icons/fi'

export function ProfilePhotoUploader(props: any) {
  const [images, setImages] = React.useState([])
  const maxNumber = 1

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined) => {
    // data for submit

      setImages(imageList as never[])
      
      const imgs = imageList.map((img) => {
        return {
          name: img.file?.name,
          dataURL: img?.data_url
        }
      });

      props.setImages(imgs);
  }

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="flex gap-4 py-4">
              <button
                style={isDragging ? { color: 'red' } : undefined}
                className="flex gap-2 rounded-md bg-emerald-600 p-2 text-white"
                onClick={onImageUpload}
                {...dragProps}
              >
                Adicionar Imagem <FiPlusCircle size={25} />
              </button>
              <button
                className="flex gap-2 rounded-md bg-red-700 p-2 text-white"
                onClick={onImageRemoveAll}
              >
                Remover Todas Imagens <AiFillDelete size={25} />
              </button>
            </div>
            <div className="flex gap-4">
              {imageList.map((image, index) => (
                <div key={index} className="image-item shadow-md">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper my-2 flex justify-center gap-2">
                    <button
                      className="text-yellow-600"
                      onClick={() => onImageUpdate(index)}
                    >
                      <AiFillSetting size={24} />
                    </button>
                    <button
                      className="text-red-700"
                      onClick={() => onImageRemove(index)}
                    >
                      <AiFillDelete size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>

      <div className="flex h-96 w-96 justify-center overflow-hidden rounded-full bg-slate-300 shadow-md">
        <FiUser size={400}/>
        <div className="absolute h-96 w-96 flex justify-center items-end gap-4 pb-16">
          <button className="bg-red-700 h-10 w-16 mx-2 rounded-sm">sdfsdfs</button>
          <button className="bg-green-700 h-10 w-20 rounded-sm">sdfsdfs</button>
        </div>
      </div>
    </div>
  )
}
