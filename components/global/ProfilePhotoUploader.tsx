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
            {imageList.length === 0 ? (
              <div className="flex justify-center gap-4">
                <div className="image-item flex w-full flex-col items-center shadow-md p-2">
                  <img
                    src={props.profilePhoto}
                    className="aspect-square w-1/3 rounded-full cursor-pointer"
                    onClick={() => {
                      onImageUpdate(0)
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item flex w-full flex-col items-center shadow-md"
                  >
                    <img
                      src={image['data_url']}
                      alt=""
                      className="aspect-square w-1/3 cursor-pointer rounded-full border-2 shadow-md"
                      onClick={() => onImageUpdate(index)}
                      style={{width: 160}}
                    />
                    {/* <div className="image-item__btn-wrapper my-2 flex justify-center gap-2">
                      <button
                        className="text-red-700"
                        onClick={() => onImageRemove(index)}
                      >
                        <AiFillDelete size={24} />
                      </button>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
