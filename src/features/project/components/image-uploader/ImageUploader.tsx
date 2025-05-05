'use client';

import { useImageUploader } from '../../hooks';
import { ImageList } from './ImageList';
import { UploadBox } from './UploadBox';

type ImageUploaderProps = {
  name: string;
  value: File[];
  onChange: (files: File[]) => void;
  maxImages?: number;
};

export function ImageUploader({
  name,
  value,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const {
    fileInputRef,
    previews,
    handleFileInputClick,
    handleFileChange,
    removeImage,
  } = useImageUploader(value, onChange, maxImages);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-grey text-sm absolute top-9 left-0">
        * 첫 번째 이미지가 대표 이미지로 설정됩니다. (최대 5장)
      </p>
      <UploadBox
        onClick={handleFileInputClick}
        disabled={value.length >= maxImages}
      />
      <ImageList
        previews={previews}
        removeImage={removeImage}
        maxImages={maxImages}
      />
      <input
        ref={fileInputRef}
        id={name}
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
