import { AddImageIcon, TrashIcon } from '@/app/_utils/SVGIcons';
import Image from 'next/image';
import React, { Dispatch } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface Props {
  setImages: Dispatch<React.SetStateAction<ImageListType>>;
  images: ImageListType;
}

export default function ImagesUploader({ setImages, images }: Props) {
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={30}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        dragProps,
      }) => (
        // write your building UI
        <div
          className={`upload__image-wrapper rounded-2xl border-4 border-dashed border-dark-gray p-5 flex flex-wrap items-start ${
            images.length > 0 && 'justify-center'
          } gap-6`}
        >
          {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <button onClick={() => onImageUpdate(index)}>
                <Image
                  className="w-32 md:w-44 aspect-square object-cover rounded-xl"
                  src={image['data_url']}
                  alt=""
                  width={100}
                  height={100}
                />
              </button>
              <div className="image-item__btn-wrapper text-center">
                <button
                  className="mx-auto"
                  onClick={() => onImageRemove(index)}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
          <button
            className="w-32 md:w-44 aspect-square outline-none"
            onClick={onImageUpload}
            {...dragProps}
          >
            <AddImageIcon className="w-32 md:w-44 aspect-square" />
          </button>
        </div>
      )}
    </ImageUploading>
  );
}
