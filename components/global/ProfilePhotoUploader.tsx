import React from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import {FiTool } from 'react-icons/fi'

export function ProfilePhotoUploader(props: any) {
  const [images, setImages] = React.useState([])
  const maxNumber = 1

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[])

    const imgs = imageList.map((img) => {
      return {
        name: img.file?.name,
        dataURL: img?.data_url,
      }
    })

    props.setImages(imgs)
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
        {({ imageList, onImageUpdate }) => (
          // write your building UI
          <div className="upload__image-wrapper">
              <button
                onClick={() => {
                  onImageUpdate(0)
                }}
                className="flex rounded-md border border-emerald-600 bg-emerald-600 py-1 px-2 text-white shadow-md hover:bg-white hover:text-emerald-600"
              >
                <FiTool size={18} />
              </button>

          </div>
        )}
      </ImageUploading>
    </div>
  )
}
